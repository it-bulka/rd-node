import {
  WebSocketGateway,
  OnGatewayConnection,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  WebSocketServer, OnGatewayDisconnect, OnGatewayInit
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { OnModuleDestroy, OnModuleInit  } from '@nestjs/common';
import { Socket, Server  } from 'socket.io';
import { MessagesService } from '@/messages/messages.service';
import { filter, Observable } from 'rxjs';
import {v4 as uuid} from 'uuid';
import Redis from 'ioredis';
import { ChatEvent, WS_EVENTS } from '@/events/types';
import { EventsService } from '@/events/events.service';
import { ChatsService } from '@/chats/chats.service';

const INSTANCE_ID = uuid();

@WebSocketGateway({ path: '/ws', cors: true })
export class ChatGateway implements OnGatewayInit, OnModuleInit, OnModuleDestroy, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private sub: Redis
  private event$: Observable<ChatEvent>

  constructor(
    private readonly wsService: WsService,
    private readonly messagesService: MessagesService,
    private readonly redis: Redis,
    private readonly eventsService: EventsService,
    private readonly chatsService: ChatsService
  ) {
    this.event$ = eventsService.getEvent()
  }

  onModuleInit() {
    this.sub = this.redis.duplicate()
    this.sub.subscribe('chat-events')
    this.sub.on('message', (_, raw) => {
      const msg = JSON.parse(raw);
      if(msg.src === INSTANCE_ID) return
      this.eventsService.onPubSubNext(msg);
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

    this.event$.subscribe(event => this.wsService.handleEventsSubscription(event));
  }

  afterInit(server: Server) {
    this.wsService.setSocketServer(this.server);
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
  async onJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { chatId: string }
  ) {
    await client.join(body.chatId)
    this.eventsService.onJoinNext(body.chatId)
  }

  @SubscribeMessage(WS_EVENTS.LEAVE)
  async onLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { chatId: string }
  ) {
    await this.chatsService.manageChatMembers(body.chatId, { remove: [client.data.user]})
    client.leave(body.chatId)
    this.eventsService.onLeaveNext(body.chatId)
  }

  @SubscribeMessage(WS_EVENTS.SEND)
  async onSend(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { chatId: string, text: string }
  ) {
    const msg = await this.messagesService.create(body.chatId, {
      author: client.data.user,
      text: body.text
    })
    this.eventsService.onSendMessageNext(msg);
  }

  @SubscribeMessage(WS_EVENTS.TYPING)
  onTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { chatId: string, isTyping: boolean }
  ) {
    const data = {
      chatId: body.chatId,
      user: client.data.user,
      isTyping: body.isTyping
    }

    this.eventsService.onTypingNext(data)
  }
}
