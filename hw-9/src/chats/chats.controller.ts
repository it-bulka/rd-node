import {
  Controller,
  Get, Post, Patch, Delete,
  Param,
  Body,
  HttpCode,
  UseGuards,
  Req,
  InternalServerErrorException
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatBodyDTO, ChatMenageMembersDTO } from './dto';
import { ChatNamePipe } from '@/chats/pipes/chatName.pipe';
import { RoleGuard } from '@/shared/guards';
import { WsService } from '@/ws/ws.service';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly wsService: WsService,
  ) {}

  @UseGuards(RoleGuard('creator'))
  @Post()
  async createChat(
    @Body(new ChatNamePipe()) body: ChatBodyDTO,
    @Req() req: any
  ) {
    const chat = await this.chatsService.createChat(body)
    this.wsService.notifyChatCreated(req.user, chat)

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
    const chat = await this.chatsService.manageChatMembers(id, body)
    if (!chat) {
      throw new InternalServerErrorException()
    }
    this.wsService.notifyMembersUpdated(chat.id, { chatId: chat.id, members: chat.members })
    return chat
  }

  @UseGuards(RoleGuard('admin'))
  @Delete(':id')
  @HttpCode(204)
  async deleteChat(@Param('id') id: string) {
    await this.chatsService.deleteChat(id)
  }
}
