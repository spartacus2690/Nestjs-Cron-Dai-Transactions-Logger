import { Module } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';
import { DatabaseModule } from '../../database/database.module';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ApiKeyThrottlerGuard } from './guards/api-key-throttler.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [ApiKeysController],
  providers: [ApiKeysService, ApiKeyGuard, ApiKeyThrottlerGuard],
  exports: [ApiKeysService],
})
export class ApiKeysModule {}
