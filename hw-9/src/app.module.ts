import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StoreModule } from '@/store/store.module';
import { ConfigModule } from '@nestjs/config';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    StoreModule,
    UsersModule,
    ChatsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
