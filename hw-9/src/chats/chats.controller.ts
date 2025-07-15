import {
  Controller,
  Get, Post, Patch, Delete,
  Param,
  Body,
  HttpCode,
  UseGuards
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatBodyDTO, ChatMenageMembersDTO } from './dto';
import { ChatNamePipe } from '@/chats/pipes/chatName.pipe';
import { RoleGuard } from '@/shared/guards';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(RoleGuard('creator'))
  @Post()
  async createChat(
    @Body(new ChatNamePipe()) body: ChatBodyDTO ) {
    const chat = await this.chatsService.createChat(body)
    return {
      id: chat.id,
      members: chat.members,
      name: chat.name,
    }
  }

  @UseGuards(RoleGuard(['admin', 'creator']))
  @Get()
  async getUserChats() {
    // TODO: user ID ?
    const userId = '988d8d2c-ab21-42af-bef8-e1180b91ccfe'
    const chats = await this.chatsService.getUserChats(userId)
    return { items: chats }
  }

  @UseGuards(RoleGuard('admin'))
  @Patch(':id/members')
  async manageChatMembers(
    @Param('id') id: string,
    @Body() body: ChatMenageMembersDTO
  ) {
    return await this.chatsService.manageChatMembers(id, body)
  }

  @UseGuards(RoleGuard('admin'))
  @Delete(':id')
  @HttpCode(204)
  async deleteChat(@Param('id') id: string) {
    await this.chatsService.deleteChat(id)
  }
}
