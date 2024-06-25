import { FastifyInstance } from "fastify";
import { knex } from "../../configs/database";
import { authenticateUser } from "../../middlewares/authenticateUser";
import { FastifyRequestWithUser } from "../../@types/fastifyRequest";

export async function MeatsRoutes(app: FastifyInstance) {
    app.addHook('preHandler', authenticateUser)

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
