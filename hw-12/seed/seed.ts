import { AppDataSource } from './data-source';
import { Account } from '../src/transfer/entities/account.entity';

async function seed() {
  await AppDataSource.initialize();

  const accountsRepo = AppDataSource.getRepository(Account);

  const fromId = "d283490c-8cf6-40f9-8e9e-3de366d2a0d8";
  const toId = "36b180e8-ad43-423a-9b7a-103d548be579";

  await accountsRepo.save([
    { id: fromId, balance: 100 },
    { id: toId, balance: 50 },
  ]);

  console.log('Seed finished');
  await AppDataSource.destroy();
}

seed();
