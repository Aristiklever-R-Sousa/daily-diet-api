import { FastifyInstance } from "fastify";
import { knex } from "../../configs/database";
import { authenticateUser } from "../../middlewares/authenticateUser";
import { FastifyRequestWithUser } from "../../@types/fastifyRequest";
import { MeatStoreRequestInterface } from "../../@types/meal";

export async function MeatsRoutes(app: FastifyInstance) {
    app.addHook('preHandler', authenticateUser)

    app.get('/', async (req: FastifyRequestWithUser, res) => {

        const loggedUserMeats = await knex('meats')
            .where({ user_id: req.user?.id })
            .orderBy('dt_snack');

        res.status(201).send({
            data: loggedUserMeats
        })
    })

    app.post('/', async (req: FastifyRequestWithUser, res) => {
        const requestBody = req.body as MeatStoreRequestInterface

        const createdData = await knex('meats').insert({
            name: requestBody.name,
            description: requestBody.description,
            is_part_of_diet: requestBody.isPartOfDiet,
            dt_snack: requestBody.date + ' ' + requestBody.time,
            user_id: req.user?.id,
        }).returning('*')

        res.status(201).send({
            data: createdData
        })
    })

    app.get('/:meatId', async (req: FastifyRequestWithUser, res) => {
        const { meatId } = req.params as { meatId: number }

        const data = await knex('meats')
            .where({ id: meatId, user_id: req.user?.id })
            .first()

        const hasData = Boolean(data);

        if (!hasData) {
            return res.status(404).send({
                error: 'Meat not found.',
            })
        }

        res.status(200).send({
            data
        })
    })

    app.put('/:meatId', async (req: FastifyRequestWithUser, res) => {
        const { meatId } = req.params as { meatId: number }
        const requestBody = req.body as MeatStoreRequestInterface

        const hasData = Boolean(
            await knex('meats')
                .where({ id: meatId, user_id: req.user?.id })
                .first()
        );

        if (!hasData) {
            return res.status(404).send({
                error: 'Meat not found.',
            })
        }

        const updatedData = await knex('meats')
            .where({ id: meatId, user_id: req.user?.id })
            .update({
                name: requestBody.name,
                description: requestBody.description,
                is_part_of_diet: requestBody.isPartOfDiet,
                dt_snack: requestBody.date + ' ' + requestBody.time,
                updated_at: knex.fn.now()
            }).returning('*')

        res.status(200).send({
            data: updatedData
        })
    })

    app.delete('/:meatId', async (req: FastifyRequestWithUser, res) => {
        const { meatId } = req.params as { meatId: number }
        const requestBody = req.body as MeatStoreRequestInterface

        const hasData = Boolean(
            await knex('meats')
                .where({ id: meatId, user_id: req.user?.id })
                .first()
        );

        if (!hasData) {
            return res.status(404).send({
                error: 'Meat not found.',
            })
        }

        const deletedData = await knex('meats')
            .where({ id: meatId, user_id: req.user?.id })
            .delete()
            .returning('*')

        res.status(204).send()
    })


}
