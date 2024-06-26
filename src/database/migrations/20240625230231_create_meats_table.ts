import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('meats', table => {
        table.bigIncrements('id').primary()
        table.bigInteger('user_id').notNullable()
        table.foreign('user_id').references('id').inTable('users')

        table.string('name')
        table.text('description')
        table.dateTime('dt_snack')
        table.boolean('is_part_of_diet').notNullable().defaultTo(false)

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('meats')
}

