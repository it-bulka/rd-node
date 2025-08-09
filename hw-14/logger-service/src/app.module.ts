import { Module } from '@nestjs/common';
import { LoggerController } from './logger/logger.controller';
import { RedisModule } from './redis/redis.module';
import { RetryWorkerModule } from './retry-worker/retry-worker.module';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.example',
    }),
    RedisModule,
    RetryWorkerModule,
    KafkaModule
  ],
  controllers: [LoggerController],
  providers: [],
})
export class AppModule {}
