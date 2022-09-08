import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('dai_transactions', (table) => {
    table.string('hash').primary();
    table.string('from').notNullable();
    table.string('to').notNullable();
    table.string('value').notNullable();
    table.integer('block_num').notNullable();
    table.timestamp('block_timestamp').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('dai_transactions');
}
