import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateEnv } from './validation';
import { DatabaseModule } from '../database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { DaiModule } from './dai/dai.module';
import { ApiKeysModule } from './api-keys/api-keys.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
      ignoreEnvFile: false,
    }),
    DatabaseModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const TTL = config.get('THROTTLE_TTL')
          ? parseInt(config.get('THROTTLE_TTL'), 10)
          : 60;
        const LIMIT = config.get('THROTTLE_LIMIT')
          ? parseInt(config.get('THROTTLE_LIMIT'), 10)
          : 500;
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
    DaiModule,
    ApiKeysModule,
  ],
})
export class AppModule {}
