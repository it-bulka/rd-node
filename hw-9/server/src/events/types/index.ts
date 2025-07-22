import { ChatDTO, MessageDTO } from '@/dto';

export enum WS_EVENTS {
  JOIN = 'join',
  LEAVE = 'leave',
  SEND = 'send',
  MESSAGE = 'message',
  TYPING = 'typing',
  CHAT_CREATED = 'chatCreated',
  MEMBERS_UPDATED = 'membersUpdated',
}

export type ChatEvent =
  | { ev: WS_EVENTS.JOIN; data: { chatId: string }; meta?: any }
  | { ev: WS_EVENTS.LEAVE; data: { chatId: string }; meta?: any }
  | { ev: WS_EVENTS.TYPING; data: { chatId: string, isTyping: boolean }; meta?: any }
  | { ev: WS_EVENTS.SEND; data: MessageDTO; meta?: any }
  | { ev: WS_EVENTS.MESSAGE; data: MessageDTO; meta?: any }
  | { ev: WS_EVENTS.CHAT_CREATED; data: ChatDTO; meta?: any }
  | { ev: WS_EVENTS.MEMBERS_UPDATED; data: { chatId: string, members: string[] }, meta?: any };