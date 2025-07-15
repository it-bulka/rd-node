import { ChatDTO } from '@/dto';

export type ChatBodyDTO = Pick<ChatDTO, 'members'> & { name?: string }
export type ChatMenageMembersDTO = { add?: string[], remove?: string[]}