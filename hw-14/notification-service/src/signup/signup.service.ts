import { Injectable, Inject, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SignupService implements OnModuleInit, OnApplicationShutdown {

  constructor(
    @Inject('KAFKA_CLIENT') private kafka: ClientKafkaProxy
  ) {}

  async onModuleInit() {
    await this.kafka.connect();
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
