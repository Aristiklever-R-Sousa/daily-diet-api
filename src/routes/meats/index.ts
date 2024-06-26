import { FastifyInstance } from "fastify";
import { knex } from "../../configs/database";
import { authenticateUser } from "../../middlewares/authenticateUser";
import { FastifyRequestWithUser } from "../../@types/fastifyRequest";
import { MeatStoreRequestInterface } from "../../@types/meal";

export async function MeatsRoutes(app: FastifyInstance) {
    app.addHook('preHandler', authenticateUser)

    app.post('/', async (req: FastifyRequestWithUser, res) => {
        const requestBody = req.body as MeatStoreRequestInterface

        const createdData = await knex('meats').insert({
            name: requestBody.name,
            description: requestBody.description,
            is_part_of_diet: requestBody.isPartOfDiet,
            dt_snack: requestBody.date + ' ' + requestBody.time
        }).returning('*')

        res.status(201).send({
            data: createdData
        })
    })

    app.get('/', async (req: FastifyRequestWithUser, res) => {
        console.log(req.user)

        res.status(201).send({
            data: [
                {
                    'message': 'Deu bom!'
                }
            ]
        })
    })
}
