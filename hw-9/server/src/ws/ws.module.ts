import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from '@/messages/messages.module';
import { RedisModule } from '@/redis/redis.module';
import { EventsModule } from '@/events/events.module';
import { ChatsModule } from '@/chats/chats.module';

@Module({
  providers: [ChatGateway, WsService],
  imports: [MessagesModule, RedisModule, EventsModule, ChatsModule]
})
export class WsModule {}
