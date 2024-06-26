import setupKnex, { type Knex } from "knex";

const DATABASE_CONNECTION: 'sqlite3' | 'pg' = 'sqlite3'
const DATABASE_HOST = 'localhost'
const DATABASE_PORT = 3306
const DATABASE_USER = 'localhost'
const DATABASE_PASSWORD = 'localhost'
const DATABASE_NAME = 'example_db'

export const dbConfig: Knex.Config = {
    client: DATABASE_CONNECTION,
    connection: DATABASE_CONNECTION == 'sqlite3'
        ? { filename: './src/database/database.db' }
        : {
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME,
        },
    migrations: {
        extension: 'ts',
        directory: './src/database/migrations'
    },
    useNullAsDefault: DATABASE_CONNECTION == 'sqlite3'
}

export const knex = setupKnex(dbConfig)
