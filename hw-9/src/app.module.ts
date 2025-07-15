import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StoreModule } from '@/store/store.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    StoreModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
