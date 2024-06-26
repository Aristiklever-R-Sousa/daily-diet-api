import { Knex } from "knex"
import { UserInterface } from "./users"
import { UserTokenInterface } from "./userTokens"
import { MeatInterface } from "./meal"

declare module 'knex/types/tables' {
    export interface Tables {
        users: UserInterface,
        user_tokens: UserTokenInterface,
        meats: MeatInterface,
    }
}
