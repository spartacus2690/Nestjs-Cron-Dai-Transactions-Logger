import { plainToClass } from 'class-transformer';
import { IsString, IsEnum, validateSync, IsOptional } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class TestEnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsString()
  DB_USER: string;
  @IsString()
  DB_PASS: string;
  @IsString()
  DB_NAME: string;
  @IsString()
  DB_HOST: string;
  @IsString()
  DB_PORT: string;
  @IsString()
  ALCHEMY_API_KEY: string;
  @IsString()
  @IsOptional()
  REDIS_HOST?: string;
  @IsString()
  @IsOptional()
  REDIS_PORT?: string;
  @IsString()
  @IsOptional()
  REDIS_PASSWORD?: string;
  @IsString()
  @IsOptional()
  THROTTLE_LIMIT?: string;
  @IsString()
  @IsOptional()
  THROTTLE_TTL?: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(TestEnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
