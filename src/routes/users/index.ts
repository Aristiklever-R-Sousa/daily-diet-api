import { FastifyInstance } from "fastify";
import { knex } from "../../configs/database";
import { UserInterface } from "../../@types/users";
import { compare, hash } from "bcrypt";
import { randomUUID } from "crypto";

export async function UsersRoutes(app: FastifyInstance) {
    app.post('/', async (req, res) => {
        const requestBody = req.body as UserInterface

        const userCreated = await knex('users').insert({
            user_name: requestBody.user_name,
            password: await hash(requestBody.password, 6)
        }).returning('*')

        res.status(201).send({
            data: userCreated
        })
    })

    app.post('/login', async (req, res) => {
        const requestBody = req.body as UserInterface

        const user = await knex('users as u')
            .where('u.user_name', requestBody.user_name)
            .first('u.*')

        if (!user || !(await compare(requestBody.password, user.password))) {
            return res.status(404).send({
                error: 'User not found.',
            })
        }

        const [token_uuid] = await knex('user_tokens')
            .insert({
                token_uuid: randomUUID(),
                user_id: user.id,
            })
            .returning('token_uuid')

        res.status(200).send({
            data: {
                user: {
                    id: user.id,
                    user_name: user.user_name,
                },
                token_uuid
            }
        })
    })
}
