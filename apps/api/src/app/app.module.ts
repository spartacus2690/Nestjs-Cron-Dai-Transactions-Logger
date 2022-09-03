import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnv } from './validation';
import { DatabaseModule } from '../database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

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
        const TTL = config.get('THROTTLE_TTL') || 60;
        if (config.get('REDIS_HOST')) {
          return {
            ttl: TTL,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
