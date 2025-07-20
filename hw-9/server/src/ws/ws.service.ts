import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatDTO } from '@/dto';
import { Subject } from 'rxjs';


@Injectable()
export class WsService {
  private server: Server;
  private userSockets = new Map<string, Set<string>>();constructor() {}

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

  sendMessageToUser(userId: string, event: string, payload: any) {
    const sockets = this.userSockets.get(userId);
    if (!sockets || !this.server) return;

    for (const socketId of sockets) {
      this.server.to(socketId).emit(event, payload);
    }
  }

  notifyMembersUpdated(chatId: string, payload: { chatId: string, members: string[] }) {
    console.log('notifyMembersUpdated [WS] Server injected:', !!chatId);
    const room = this.server.sockets.adapter.rooms.get(chatId);
    console.log(`Sockets in room ${chatId}:`, room);
    this.server.to(chatId).emit('membersUpdated', payload);
    console.log('Rooms at set time:', Array.from(this.server.sockets.adapter.rooms.entries()));
  }

  notifyChatCreated(userId: string, payload: ChatDTO) {
    this.sendMessageToUser(userId, 'chatCreated', payload);
  }

}
