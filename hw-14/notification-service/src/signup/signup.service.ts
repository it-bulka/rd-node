import { Injectable, Inject, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SignupService implements OnModuleInit, OnApplicationShutdown {

  constructor(
    @Inject('KAFKA_CLIENT') private kafka: ClientKafkaProxy
  ) {}

  async onModuleInit() {
    console.log('wORK');
    try {
      await this.kafka.connect();
      console.log('Kafka connected');
    } catch (err) {
      console.error('Kafka connection failed:', err.message);
    }
  }

  async onApplicationShutdown() {
    await this.kafka.close();
  }

  async signUp(data: any) {
    await firstValueFrom(
      this.kafka.emit('events.notifications', {
        event: 'UserSignedUp',
        data,
      })
    )
  }
}
