import { BadRequestException, Injectable } from '@nestjs/common';
import { Store } from '@/store/store.service';
import { CreateMessageDTO, GetMessagesDTO, MessagesResDTO } from './dto';

@Injectable()
export class MessagesService {
  constructor(
    private readonly store: Store
  ) {}

  async getList({ chatId, cursor, limit } : GetMessagesDTO) {
    const chat = await this.store.chats.getOne(chatId);
    if(!chat) throw new BadRequestException(`Chat with ID ${chatId} does not exist`);

    const res: MessagesResDTO = { items: [] };

    const all = await this.store.messages.getAllByChatId(chatId);
    if(!all.length) return res

    const startIndex = !cursor ? 0 : (all.findIndex(msg => msg.sentAt === cursor) + 1);
    if(startIndex === -1) return res;

    const endIndex = startIndex + limit;
    const list = all.slice(startIndex, endIndex);
    res.items = list;
    if(endIndex === all.length - 1) return res;

    let lastElIndex = list.length - 1;
    if(lastElIndex < 0) lastElIndex = 0;

    res.nextCursor = list[lastElIndex].sentAt;
    return res;
  }

  async create(chatId: string, { author, text }: CreateMessageDTO) {
    return await this.store.messages.createOne({
      author,
      text,
      sentAt: new Date().toISOString(),
      chatId
    });
  }
}
