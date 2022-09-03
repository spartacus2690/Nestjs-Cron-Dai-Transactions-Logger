import { knex } from 'knex';
import { knexConfig } from './knexfile';

export const createPool = () => {
  if (process.env.DB_ENV === 'testing') {
    return knex(knexConfig.testing);
  }
  throw new Error('ABORT INVALID DATABASE CONFIG');
};
