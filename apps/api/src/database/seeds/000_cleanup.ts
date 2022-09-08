import { Knex } from 'knex';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { clean } from 'knex-cleaner';

export async function seed(knex: Knex): Promise<void> {
  return clean(knex, {
    mode: 'truncate',
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
}
