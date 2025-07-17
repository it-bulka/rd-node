import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from '@/messages/messages.module';
import { RedisModule } from '@/redis/redis.module';

@Module({
  providers: [ChatGateway, WsService],
  imports: [MessagesModule, RedisModule],
  exports: [WsService]
})
export class WsModule {}
