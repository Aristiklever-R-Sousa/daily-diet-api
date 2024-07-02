import { FastifyInstance } from "fastify";
import { knex } from "../../configs/database";
import { UserInterface } from "../../@types/users";
import { compare, hash } from "bcrypt";
import { randomUUID } from "crypto";
import { FastifyRequestWithUser } from "../../@types/fastifyRequest";
import { authenticateUser } from "../../middlewares/authenticateUser";

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

    app.get('/me/metrics', { preHandler: authenticateUser }, async (req: FastifyRequestWithUser, res) => {

        const mealsRegistered = await knex('meats')
            .where({ user_id: req.user?.id })
            .orderBy('dt_snack')

        const amountMealsRegistered = mealsRegistered.length

        const amountMealsInDiet = (await knex('meats')
            .where({ user_id: req.user?.id, is_part_of_diet: true })
            .count('* as count')
            .first())?.count

        const amountMealsOutDiet = (await knex('meats')
            .where({ user_id: req.user?.id, is_part_of_diet: false })
            .count('* as count')
            .first())?.count

        let bestSequenceMealsInDiet = 0;
        let actualSequeceMealsInDiet = 0

        mealsRegistered.forEach((meal) => {

            if (meal.is_part_of_diet) {
                actualSequeceMealsInDiet++
            } else {
                if (actualSequeceMealsInDiet > bestSequenceMealsInDiet) {
                    bestSequenceMealsInDiet = actualSequeceMealsInDiet
                }

                actualSequeceMealsInDiet = 0
            }

        })

        if (actualSequeceMealsInDiet > bestSequenceMealsInDiet) {
            bestSequenceMealsInDiet = actualSequeceMealsInDiet
        }

        res.status(200).send({
            amount_meals_registered: amountMealsRegistered,
            amount_meals_in_diet: amountMealsInDiet,
            amount_meals_out_diet: amountMealsOutDiet,
            best_sequence_meals_in_diet: bestSequenceMealsInDiet,
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
