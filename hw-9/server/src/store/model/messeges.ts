import { BaseDBModule } from '@/store/model/base';
import { MessageDTO } from '@/dto';
import { MODELS_PATHS } from '@/store/consts';

export class MessegesModel extends BaseDBModule<MessageDTO> {
  constructor() {
    super(MODELS_PATHS.messages);
  }

  async getAllByChatId(chatId: string) {
    const all = await this.getAll()

    const fromChat = all.filter(msg => msg.chatId === chatId)

    const sorted = fromChat.sort((a, b) => b.sentAt.localeCompare(a.sentAt));
    return sorted;
  }
}