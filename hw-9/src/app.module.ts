import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StoreModule } from '@/store/store.module';
import { ConfigModule } from '@nestjs/config';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from '@/messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    StoreModule,
    UsersModule,
    ChatsModule,
    MessagesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
