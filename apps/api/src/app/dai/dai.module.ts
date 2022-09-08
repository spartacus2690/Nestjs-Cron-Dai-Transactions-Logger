import { Module } from '@nestjs/common';
import { DaiService } from './dai.service';
import { DaiController } from './dai.controller';
import { DatabaseModule } from '../../database/database.module';
import { ApiKeysModule } from '../api-keys/api-keys.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ApiKeysModule, ConfigModule],
  controllers: [DaiController],
  providers: [DaiService],
})
export class DaiModule {}
