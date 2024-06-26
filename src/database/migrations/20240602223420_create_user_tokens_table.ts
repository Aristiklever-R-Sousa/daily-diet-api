import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('user_tokens', table => {
        table.bigIncrements('id').primary()
        table.uuid('token_uuid').unique()
        table.bigInteger('user_id').notNullable()
        table.foreign('user_id').references('id').inTable('users')

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('user_tokens')
}

