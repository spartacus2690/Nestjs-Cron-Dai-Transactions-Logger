import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('dai_transactions', (table) => {
    table.string('hash').primary();
    table.string('from').notNullable();
    table.string('to').notNullable();
    table.string('value').notNullable();
    table.integer('blockNum').notNullable();
    table.timestamp('blockTimestamp').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('dai_transactions');
}
