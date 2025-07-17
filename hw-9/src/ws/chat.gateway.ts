import {
  WebSocketGateway,
  OnGatewayConnection,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  WebSocketServer, OnGatewayDisconnect
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { OnModuleDestroy, OnModuleInit  } from '@nestjs/common';
import { Socket } from 'socket.io';
import { MessagesService } from '@/messages/messages.service';
import { ChatDTO } from '@/dto';
import { Subject, filter } from 'rxjs';
import {v4 as uuid} from 'uuid';
import Redis from 'ioredis';
import { raw } from 'express';

const INSTANCE_ID = uuid();
enum WS_EVENTS {
  JOIN = 'join',
  LEAVE = 'leave',
  SEND = 'send',
  TYPING = 'typing',
  CHAT_CREATED = 'chatCreated',
  MEMBERS_UPDATED = 'membersUpdated',
}

@WebSocketGateway({ path: '/ws', cors: true })
export class ChatGateway implements OnModuleInit, OnModuleDestroy, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;

  private sub: Redis
  private event$ = new Subject<{ ev: WS_EVENTS; data: any; meta?: any }>()

  constructor(
    private readonly wsService: WsService,
    private readonly messagesService: MessagesService,
    private readonly redis: Redis
  ) {}

  onModuleInit() {
    this.sub = this.redis.duplicate()
    this.sub.subscribe('chat-events')
    this.sub.on('message', (_, raw) => {
      const msg = JSON.parse(raw);
      console.log('msg', msg)
      if(msg.src === INSTANCE_ID) return
      this.event$.next(msg);
    })

    this.event$
      .pipe(filter((event) => event.meta?.local))
      .subscribe((event) => {
        this.redis.publish('chat-events', JSON.stringify({
          ...event,
          meta: undefined,
          src: INSTANCE_ID
        }));
      })

    this.event$
      .subscribe((event) => {
      const { data } = event;
      this.server.to(data.chatId).emit(data)
    })
  }

  handleConnection(client: Socket): any {
    const user = client.handshake.auth?.user as string;
    if(!user) {
      client.disconnect(true)
      return
    };

    client.data.user = user;
    this.wsService.addSocket(user, client.id)
  }

  handleDisconnect(client: Socket) {
    this.wsService.removeSocket(client.id)
  }

  onModuleDestroy(): any {
    this.sub.disconnect();
    this.redis.disconnect();
  }

  @SubscribeMessage(WS_EVENTS.JOIN)
  onJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { chatId: string }
  ) {
    client.join(body.chatId)

    this.event$.next({
      ev: WS_EVENTS.JOIN,
      data: { chatId: body.chatId },
      meta: { local: true }
    })
  }

  @SubscribeMessage(WS_EVENTS.LEAVE)
  onLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { chatId: string }
  ) {
    client.leave(body.chatId)
    this.event$.next({
      ev: WS_EVENTS.JOIN,
      data: { chatId: body.chatId },
      meta: { local: true }
    })
  }

  @SubscribeMessage(WS_EVENTS.SEND)
  async onSend(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { chatId: string, text: string }
  ) {
    const msg = await this.messagesService.create(body.chatId, {
      author: client.data.user, //TODO: name || ID ?
      text: body.text
    })
    this.event$.next({
      ev: WS_EVENTS.SEND,
      data: msg,
      meta: { local: true }
    })
  }

  @SubscribeMessage(WS_EVENTS.TYPING)
  onTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { chatId: string, isTyping: boolean }
  ) {
    const data = {
      chatId: body.chatId,
      user: client.data.userId,
      isTyping: body.isTyping
    }

    this.event$.next({
      ev: WS_EVENTS.TYPING,
      data,
      meta: { local: true }
    })
  }
}
