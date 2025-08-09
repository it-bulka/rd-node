import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis.constants';
import { KafkaEvents, RedisStreams } from '../common/constants';

@Controller('logger')
export class LoggerController {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  @MessagePattern(KafkaEvents.notifications)
  async handleNotification(@Payload() msg: any) {
    try {
      // ERROR SIMULATION
      //throw new Error('Not implemented');

      console.log('LoggerService received event:', msg);
    } catch (err) {
      console.log('error', err);
      await this.redis.xadd(
        RedisStreams.notifications,
        '*',
        'event', JSON.stringify(msg.event),
        'data', JSON.stringify(msg.data),
      );
    }
  }
}
