import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Account } from '../transfer/entities/account.entity';
import { Movement } from '../transfer/entities/movements.entity';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('DB_HOST') || 'localhost',
  port: configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USER'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_DB'),
  schema: configService.getOrThrow('DB_SCHEMA'),
  entities: [Account, Movement, __dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get('NODE_ENV') === 'development' || configService.get('NODE_ENV') === 'test'
});
