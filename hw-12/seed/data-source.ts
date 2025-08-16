import { DataSource } from 'typeorm';
import { Account } from '../src/transfer/entities/account.entity';
import { Movement } from '../src/transfer/entities/movements.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  schema: process.env.DB_SCHEMA,
  entities: [Account, Movement],
  synchronize: true
});
