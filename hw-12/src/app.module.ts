import { Module } from '@nestjs/common';
import { TransferModule } from './transfer/transfer.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TransferModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
