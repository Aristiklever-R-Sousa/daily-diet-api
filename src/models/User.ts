import { UserInterface } from "../@types/users";

export class User implements UserInterface {
    constructor(public id: number, public user_name: string) { }
}
