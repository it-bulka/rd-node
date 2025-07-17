import { BaseDBModule } from './base';
import { ChatDTO } from '@/dto';
import { MODELS_PATHS } from '@/store/consts';

export class ChatsModel extends BaseDBModule<ChatDTO> {
  constructor() {
    super(MODELS_PATHS.chats);
  }

  async getAllByUserId(userId: string) {
    const all = await this.getAll()
    return all.filter(item => item.members.includes(userId))
  }
}
