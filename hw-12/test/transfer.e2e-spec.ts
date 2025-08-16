import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { Account } from '../src/transfer/entities/account.entity';
import { Movement } from '../src/transfer/entities/movements.entity';

describe('TransferController (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
  })

  beforeEach(async () => {
    await dataSource.query('TRUNCATE TABLE "transfer"."movement" CASCADE;');
    await dataSource.query('TRUNCATE TABLE "transfer"."account" CASCADE;');
  });


  it('sucessful transfer', async () => {
    const [from] = await dataSource.getRepository(Account).save([{ balance: 100 }]);
    const [to] = await dataSource.getRepository(Account).save([{ balance: 50 }]);

    const res = await request(app.getHttpServer())
      .post('/transfer')
      .send({ from: from.id, to: to.id, amount: 40 })
      .expect(201)

    expect(res.body.amount).toBe(40)

    const updatedFrom = await dataSource.getRepository(Account).findOneBy({ id: from.id });
    const updatedTo = await dataSource.getRepository(Account).findOneBy({ id: to.id });

    // numeric type
    expect(updatedFrom?.balance).toBe('60.00');
    expect(updatedTo?.balance).toBe('90.00');
  });

  it('not enought money -> rollback', async () => {
    const [from] = await dataSource.getRepository(Account).save([{ balance: 30 }]);
    const [to] = await dataSource.getRepository(Account).save([{ balance: 50 }]);

    await request(app.getHttpServer())
      .post('/transfer')
      .send({ from: from.id, to: to.id, amount: 40 })
      .expect(400)

    const accounts = await dataSource.getRepository(Account).find();
    const movements = await dataSource.getRepository(Movement).find();

    expect(accounts[0].balance).toBe('30.00');
    expect(accounts[1].balance).toBe('50.00');

    expect(movements).toHaveLength(0);
  })
});
