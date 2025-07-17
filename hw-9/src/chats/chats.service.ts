import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Store } from '@/store/store.service';
import { ChatDTO } from '@/dto';
import { v4 } from 'uuid';
import { ChatMenageMembersDTO } from './dto';

@Injectable()
export class ChatsService {
  constructor(
    private readonly store: Store
  ) {}

  async createChat({ name, members }: Pick<ChatDTO, 'members'> & { name?: string }) {
    let chatName = name

    if(!name && members.length === 2) {
      chatName = await this.generateChatNameForTwo(members)
    };
    const createdChat = await this.store.chats.createOne({
      name: chatName || v4(),
      members,
      updatedAt: new Date().toISOString(),
    })

    return createdChat
  }

  async getUserChats(userId: string) {
    return await this.store.chats.getAllByUserId(userId)
  }

  async manageChatMembers(id: string, { add = [], remove = []}: ChatMenageMembersDTO) {
    const chat = await this.store.chats.getOne(id)
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`)
    }
    const removingMap = remove.reduce((acc, item) => {
      acc[item] = item;
      return acc;
    }, {});

    const existedMembers = chat.members
    const withAddedMembers = Array.from(new Set(...existedMembers, ...add))
    const filteredMembers = withAddedMembers.filter(item => !removingMap[item])

    return await this.store.chats.updateOne(
      id,
      { members: filteredMembers, updatedAt: new Date().toISOString() }
    );
  }

  async deleteChat(id: string) {
    const deleted = await this.store.chats.deleteOne(id)
    if (!deleted) {
      throw new NotFoundException('Chat not found');
    }
  }

  private async generateChatNameForTwo(members: string[]) {
    const userA = await this.store.users.getOne(members[0])
    const userB = await this.store.users.getOne(members[1])

    if(!userA) throw new BadRequestException(`Members with ID ${members[0]} does not exist`)
    if(!userB) throw new BadRequestException(`Members with ID ${members[1]} does not exist`)

    return `${userA?.name} & ${userB?.name}`
  }
}
