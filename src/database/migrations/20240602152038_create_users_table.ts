import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('users', (table) => {
        table.bigIncrements('id').primary()
        table.string('user_name').notNullable().unique()
        table.string('password').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('users')
}

