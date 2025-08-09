import { Module, Global } from '@nestjs/common';
import { RedisProvider } from './redis.provider';

@Global()
@Module({
  controllers: [],
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule {}
