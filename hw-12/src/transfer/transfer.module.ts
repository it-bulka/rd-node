import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from './entities/movements.entity';
import { Account } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movement, Account])],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
