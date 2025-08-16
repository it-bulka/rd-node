import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Movement } from './entities/movements.entity';
import { Account } from './entities/account.entity';

@Injectable()
export class TransferService {
  constructor(private dataSource: DataSource) {}

  async transfer(fromId: string, toId: string, amount: number) {
    return await this.dataSource.transaction(async (manager) => {
      const fromAccount = await manager.findOne(Account, { where: { id: fromId } });
      const toAccount = await manager.findOne(Account, { where: { id: toId } });

      if (!fromAccount) {
        throw new BadRequestException(`Account ${fromId} not found`);
      }

      if (!toAccount) {
        throw new BadRequestException(`Account ${toId} not found`);
      }

      if (fromAccount.balance < amount) {
        throw new BadRequestException('Insufficient balance');
      }

      fromAccount.balance -= amount;
      await manager.save(fromAccount);

      toAccount.balance = Number(toAccount.balance) + amount;
      await manager.save(toAccount);

      const movement = manager.create(Movement, {
        from: fromId,
        to: toId,
        amount: amount,
      })
      await manager.save(movement);

      return { ...movement, amount: Number(movement.amount) };
    })
  }
}
