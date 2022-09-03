import { Module } from '@nestjs/common';
import { Model } from 'objection';
import { models, createPool } from '@tessera/shared';

const pool = createPool();

const modelProvider = models.map((model) => ({
  provide: model.name,
  useValue: model,
}));

const providers = [
  ...modelProvider,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      Model.knex(pool);
      return pool;
    },
  },
];

@Module({
  providers,
  exports: [...providers],
})
export class DatabaseModule {}
