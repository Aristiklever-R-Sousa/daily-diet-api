import { FastifyInstance } from "fastify";
import { knex } from "../../configs/database";
import { UserInterface } from "../../@types/users";

export async function UsersRoutes(app: FastifyInstance) {
    app.post('/', async (req, res) => {
        const requestBody = req.body as UserInterface

        const userCreated = await knex('users').insert({
            user_name: requestBody.user_name
        }).returning('*')

        res.status(201).send({
            data: userCreated
        })
    })
}
