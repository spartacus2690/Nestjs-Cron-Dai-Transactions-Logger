import * as request from 'supertest';
import { Knex } from 'knex';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from '../src/database/database.module';
import { DaiModule } from '../src/app/dai/dai.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import * as _ from 'lodash/fp';

describe('dai', () => {
  let app: INestApplication;
  let db: Knex;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        DaiModule,
        DatabaseModule,
        ThrottlerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => {
            const TTL = 60;
            const LIMIT = 5;
            if (config.get('REDIS_HOST')) {
              return {
                ttl: TTL,
                limit: LIMIT,
                storage: new ThrottlerStorageRedisService({
                  host: config.get('REDIS_HOST'),
                  port: config.get('REDIS_PORT'),
                  password: config.get('REDIS_PASSWORD'),
                }),
              };
            }
            return {
              ttl: TTL,
            };
          },
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    db = moduleRef.get('KnexConnection');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      })
    );

    await db.seed.run();
    await app.init();
  });

  describe('api key validation/throttling', function () {
    it('throws 403 if api key is invalid', async () => {
      await request(app.getHttpServer())
        .get('/dai/transactions')
        .set({ ['api-key']: 'fefd74f1-6f9a-435f-90f4-0123881fde36' })
        .expect(403);
    });

    it('throws 429 if too many requests for specific api-key', async () => {
      // limit is 5 requests per 60 secs
      for (let i = 0; i < 7; i++) {
        let promise = request(app.getHttpServer())
          .get('/dai/transactions')
          .set({ ['api-key']: '306e488e-62c0-4f41-b7e0-1f3d8c7098f2' });
        if (i == 7) {
          //6th request should fail
          promise = promise.expect(429);
        }
        await promise;
      }
    });
  });

  describe('GET /api/dai/transactions', function () {
    it('gets first page and second page of latest transactions', async () => {
      const {
        body: { results: results1, lastTimestamp },
      } = await request(app.getHttpServer())
        .get('/dai/transactions')
        .set({ ['api-key']: '306e488e-62c0-4f41-b7e0-1f3d8c7098f2' })
        .expect(200);

      expect(results1).toHaveLength(100);

      const {
        body: { results: results2 },
      } = await request(app.getHttpServer())
        .get('/dai/transactions')
        .set({ ['api-key']: '306e488e-62c0-4f41-b7e0-1f3d8c7098f2' })
        .query({ timestamp: lastTimestamp })
        .expect(200);

      const hashesSetFromFirstResult = _.reduce(
        (acc, { hash }) => {
          acc.add(hash);
          return acc;
        },
        new Set(),
        results1
      );

      expect(hashesSetFromFirstResult.size).toBe(100);
      const hashesInSecondResult = _.map(({ hash }) => hash, results2);
      expect(hashesInSecondResult).toHaveLength(100);
      // new results should have no previous transactions
      expect(
        _.filter(
          (hash) => hashesSetFromFirstResult.has(hash),
          hashesInSecondResult
        )
      ).toHaveLength(0);
    });
  });

  describe('GET /api/transactions/:address', function () {
    it('gets transactions where to/from is specified address', async () => {
      const address = '0x60594a405d53811d3bc4766596efd80fd545a270';
      const {
        body: { results },
      } = await request(app.getHttpServer())
        .get(`/dai/transactions/${address}`)
        .set({ ['api-key']: '306e488e-62c0-4f41-b7e0-1f3d8c7098f2' })
        .expect(200);

      for (const { from, to } of results) {
        expect(from === address || to === address).toBe(true);
      }
    });
  });

  describe('GET /api/balance/:address', function () {
    it("gets balance that isn't in database", async () => {
      const daiAddress = '0x21e184cadc44c1b393e2dea59ef1ab72a15951a1';

      const balanceInDbBefore = await db('dai_balances')
        .where({ address: daiAddress })
        .first();

      expect(balanceInDbBefore).toBeUndefined();

      const {
        body: { address, balance },
      } = await request(app.getHttpServer())
        .get(`/dai/balance/${daiAddress}`)
        .set({ ['api-key']: '306e488e-62c0-4f41-b7e0-1f3d8c7098f2' })
        .expect(200);
      expect(address).toBeDefined();
      expect(balance).toBeDefined();

      const balanceInDbAfter = await db('dai_balances')
        .where({ address: daiAddress })
        .first();

      expect(balanceInDbAfter).toBeDefined();
    });

    it('gets balance that is in database', async () => {
      const daiAddress = '0x937a0c4697e5551ba3a50f8beb279ed0a71d08b5';

      const balanceInDb = await db('dai_balances')
        .where({ address: daiAddress })
        .first();

      expect(balanceInDb).toBeDefined();

      const {
        body: { address, balance },
      } = await request(app.getHttpServer())
        .get(`/dai/balance/${daiAddress}`)
        .set({ ['api-key']: '306e488e-62c0-4f41-b7e0-1f3d8c7098f2' })
        .expect(200);
      expect(address).toBeDefined();
      expect(balance).toBeDefined();
    });
  });

  afterAll(async () => {
    await app.close();
    await db.destroy();
  });
});
