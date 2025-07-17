import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDTO } from '@/messages/dto';

@Controller('chats/:id/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async list(
    @Param('id') id: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit = '30'
  ) {
    return await this.messagesService.getList({ chatId: id, cursor, limit: Number(limit) });
  }

  @Post()
  async create(
    @Param('id') id: string,
    @Body() dto: CreateMessageDTO,
  ) {
    return await this.messagesService.create(id, dto)
  }
}
