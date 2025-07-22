import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { EventsModule } from '@/events/events.module';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
  imports: [EventsModule],
  exports: [ChatsService],
})
export class ChatsModule {}
