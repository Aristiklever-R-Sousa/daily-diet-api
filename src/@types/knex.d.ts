import { Knex } from "knex"
import { UserInterface } from "./users"

declare module 'knex/types/tables' {
    export interface Tables {
        users: UserInterface
    }
}
