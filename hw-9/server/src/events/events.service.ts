import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { ChatDTO, MessageDTO } from '@/dto';
import { ChatEvent, WS_EVENTS } from './types';

@Injectable()
export class EventsService {
  private event$ = new Subject<ChatEvent>()

  constructor() {}

  getEvent() {
    return this.event$.asObservable();
  }

  onJoinNext(chatId: string) {
    this.event$.next({
      ev: WS_EVENTS.JOIN,
      data: { chatId },
      meta: { local: true }
    })
  }
  onLeaveNext(chatId: string) {
    this.event$.next({
      ev: WS_EVENTS.LEAVE,
      data: { chatId },
      meta: { local: true }
    })
  }

  onSendMessageNext(data: MessageDTO) {
    this.event$.next({
      ev: WS_EVENTS.MESSAGE,
      data,
      meta: { local: true }
    })
  }

  onTypingNext(data: { chatId: string, isTyping: boolean }) {
    this.event$.next({
      ev: WS_EVENTS.TYPING,
      data,
      meta: { local: true }
    })
  }

  onChatCreatedNext(data: ChatDTO) {
    this.event$.next({
      ev: WS_EVENTS.CHAT_CREATED,
      data,
      meta: { local: true }
    })
  }

  onMembersUpdatedNext(data: { chatId: string, members: string[] }){
    this.event$.next({
      ev: WS_EVENTS.MEMBERS_UPDATED,
      data,
      meta: { local: true }
    })
  }

  // redis pub/sub
  onPubSubNext(msg: any){
    this.event$.next(msg)
  }
}