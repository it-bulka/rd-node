import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { WsModule } from '@/ws/ws.module';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
  imports: [WsModule]
})
export class ChatsModule {}
