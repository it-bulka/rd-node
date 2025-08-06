import { Module } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [SignupModule, KafkaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
