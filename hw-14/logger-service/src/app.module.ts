import { Module } from '@nestjs/common';
import { LoggerController } from './logger/logger.controller';

@Module({
  imports: [],
  controllers: [LoggerController],
  providers: [],
})
export class AppModule {}
