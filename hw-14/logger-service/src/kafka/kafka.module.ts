import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_CLIENT } from './kafka.constants';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_CLIENT,
        transport:  Transport.KAFKA,
        options: {
          client: {
            clientId: 'retry-client',
            brokers: ['localhost:9092'],
          }
        }
      }
    ])
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
