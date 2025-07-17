import { MessageDTO } from '@/dto';

export type CreateMessageDTO = Pick<MessageDTO, 'author' | 'text'>
export type GetMessagesDTO = { chatId: string, cursor?: string, limit: number }
export type MessagesResDTO = { items: MessageDTO[], nextCursor?: string }