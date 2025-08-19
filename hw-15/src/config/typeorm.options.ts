import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Account } from '../transfer/entities/account.entity';
import { Movement } from '../transfer/entities/movements.entity';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config({ path: '.env.template' });

export function getTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions;
export function getTypeOrmConfig(): DataSourceOptions;
export function getTypeOrmConfig(configService?: ConfigService) {
  const get = (key: string, fallback?: string) =>
    configService?.get<string>(key) ?? process.env[key] ?? fallback;

  const base = {
    type: 'postgres',
    host: get('DB_HOST', 'localhost'),
    port: Number(get('DB_PORT', '5432')),
    username: get('DB_USER', 'postgres'),
    password: get('DB_PASSWORD', ''),
    database: get('DB_NAME', 'postgres'),
    entities: [Account, Movement, __dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false
  };

  if (configService) {
    return {
      ...base,
      autoLoadEntities: true,
      retryAttempts: 3,
      retryDelay: 3000,
    } as TypeOrmModuleOptions;
  }

  return base as DataSourceOptions;
}