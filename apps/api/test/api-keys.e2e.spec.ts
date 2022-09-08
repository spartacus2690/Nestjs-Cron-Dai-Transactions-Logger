import * as request from 'supertest';
import { Knex } from 'knex';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from '../src/database/database.module';
import { ApiKeysModule } from '../src/app/api-keys/api-keys.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

describe('api-keys', () => {
  let app: INestApplication;
  let db: Knex;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ApiKeysModule,
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

  describe('GET /api/api-keys', function () {});

  describe('GET /api/api_keys/new', function () {
    it('creates a new api key', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/api-keys/new')
        .expect(200);
      expect(body.api_key).toBeDefined();
      expect(
        await db('api_keys').where({ api_key: body.api_key }).first()
      ).toBeDefined();
    });
  });

  describe('GET /api/api-keys/requests/average', function () {
    it('gets average number of requests between 2022-09-09 02:46:20.873 -0400 and 2022-09-19 14:26:20.873 -0400', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/api-keys/requests/average')
        .query({
          from: '2022-09-09 02:46:20.873 -0400',
          to: '2022-09-19 14:26:20.873 -0400',
        })
        .expect(200);
      expect(body.average_num_requests).toBeDefined();
      expect(parseFloat(body.average_num_requests)).not.toBeNaN();
    });

    it('400 error if from or to is not valid timestamp format', async () => {
      await request(app.getHttpServer())
        .get('/api-keys/requests/average')
        .query({
          from: 'halloween',
          to: 'DROP TABLE super_important_table',
        })
        .expect(400);
    });
  });

  describe('GET /api/api-keys/requests/sum', function () {
    it('gets sum of requests between 2022-09-09 02:46:20.873 -0400 and 2022-09-19 14:26:20.873 -0400', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/api-keys/requests/sum')
        .query({
          from: '2022-09-09 02:46:20.873 -0400',
          to: '2022-09-19 14:26:20.873 -0400',
        })
        .expect(200);
      expect(body.sum).toBeDefined();
      expect(parseInt(body.sum, 10)).not.toBeNaN();
    });

    it('400 error if from or to is not valid timestamp format', async () => {
      await request(app.getHttpServer())
        .get('/api-keys/requests/sum')
        .query({
          from: '2022-09-09 02:46:20.873 -0400',
          to: 'the last time I ate a peanut butter and banana sandwich',
        })
        .expect(400);
    });
  });

  describe('GET /api/api-keys/requests/:api_key/highest-3-hours', function () {
    it('gets 3 hour range and date where api key 306e488e-62c0-4f41-b7e0-1f3d8c7098f2 requests have been the highest', async () => {
      const {
        body: { api_key, date, time_period, requests },
      } = await request(app.getHttpServer())
        .get(
          '/api-keys/requests/306e488e-62c0-4f41-b7e0-1f3d8c7098f2/highest-3-hours'
        )
        .expect(200);
      expect(api_key).toBe('306e488e-62c0-4f41-b7e0-1f3d8c7098f2');
      expect(date).toBe('2022-09-06T04:00:00.000Z');
      expect(time_period).toBe('12:00:00 AM - 03:00:00 AM');
      expect(parseInt(requests, 10)).toBe(60);
    });

    it('404 if specified api key not found', async () => {
      const { body } = await request(app.getHttpServer())
        .get(
          '/api-keys/requests/99999999-9999-4f41-b7e0-1f3d8c7098f2/highest-3-hours'
        )
        .expect(404);
      expect(body.message).toEqual(
        'API KEY 99999999-9999-4f41-b7e0-1f3d8c7098f2 not found.'
      );
    });
  });

  describe('GET /api/api-keys/requests/most-used', function () {
    it('gets most used api key', async () => {
      const {
        body: { api_key, requests },
      } = await request(app.getHttpServer())
        .get('/api-keys/most-used')
        .expect(200);
      expect(api_key).toBe('306e488e-62c0-4f41-b7e0-1f3d8c7098f2');
      expect(parseInt(requests, 10)).toBe(181);
    });
  });

  afterAll(async () => {
    await app.close();
    await db.destroy();
  });
});
