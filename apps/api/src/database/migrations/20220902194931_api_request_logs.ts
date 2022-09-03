import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('api_request_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('public.gen_random_uuid()'));
    table
      .string('api_key')
      .references('api_key')
      .inTable('api_keys')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamp('timestamp').notNullable().defaultTo(knex.fn.now());
    table.json('metadata').notNullable().defaultTo('{}');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('api_request_logs');
}
