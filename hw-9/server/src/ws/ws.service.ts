import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatDTO } from '@/dto';
import { ChatEvent, WS_EVENTS } from '@/events/types';

type TraversedSocket = { socketId: string, socket: Socket | undefined }

@Injectable()
export class WsService {
  private server: Server;
  private userSockets = new Map<string, Set<string>>();

  constructor() {}

  setSocketServer(socketServer: Server): void {
    console.log('[WS] Server injected:', !!socketServer)
    this.server = socketServer
  }

  addSocket(userId: string, socketId: string) {
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, new Set());
    }
    this.userSockets.get(userId)?.add(socketId);
  }

  removeSocket(socketId: string) {
    for (const [userId, sockets] of this.userSockets.entries()) {
      sockets.delete(socketId);
      if (sockets.size === 0) {
        this.userSockets.delete(userId);
      }
    }
  }

  traverseUserSockets(userId: string, cb: (arg: TraversedSocket) => void) {
    const sockets = this.userSockets.get(userId);
    if (!sockets || !this.server) return;

    for (const socketId of sockets) {
      const socket = this.server.sockets.sockets.get(socketId)
      cb({ socketId, socket });
    }
  }

  broadcast(chatId: string, ev: string, data: any): void {
    this.server.to(chatId).emit(ev, data)
  }

  notifyAll(userIds: string[], event: string, payload: any) {
    userIds.forEach((member) => {
      this.traverseUserSockets(member, ({ socket }) => socket?.emit(event, payload))
    })
  }

  notifyMembersUpdated(payload: { chatId: string, members: string[] }) {
    this.notifyAll(payload.members, 'membersUpdated', payload)
  }

  notifyChatCreated(payload: ChatDTO) {
    const joinToRoom = ({ socket }: TraversedSocket) => {
      socket?.join(payload.id);
      socket?.emit('chatCreated', payload);
    }

    payload.members.forEach((member) => {
      this.traverseUserSockets(member, joinToRoom)
    })
  }

  handleEventsSubscription(arg: ChatEvent) {
    const { ev, data } = arg
    switch (ev) {
      case WS_EVENTS.CHAT_CREATED:
        return this.notifyChatCreated(data);
      case WS_EVENTS.MEMBERS_UPDATED:
        return this.notifyMembersUpdated(data)

      default:
        return this.broadcast(data.chatId, ev, data)
    }
  }
}
