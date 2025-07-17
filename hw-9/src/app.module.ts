import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StoreModule } from '@/store/store.module';
import { ConfigModule } from '@nestjs/config';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from '@/messages/messages.module';
import { WsModule } from './ws/ws.module';
import { RedisModule } from '@/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    RedisModule.forRoot({ url: process.env.REDIS_URL ?? 'redis://localhost:6379' }),
    StoreModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
    WsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
