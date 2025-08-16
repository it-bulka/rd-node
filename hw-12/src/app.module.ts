import { Module } from '@nestjs/common';
import { TransferModule } from './transfer/transfer.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/ormconfig';

const envFiles = {
  development: '.env.template',
  test: '.env.template.test',
  default: '.env.template',
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFiles[process.env.NODE_ENV || 'default']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig
    }),
    TransferModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
