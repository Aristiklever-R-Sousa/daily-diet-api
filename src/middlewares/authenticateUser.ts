import { FastifyReply } from "fastify";
import { FastifyRequestWithUser } from "../@types/fastifyRequest";
import { knex } from "../configs/database";

export async function authenticateUser(request: FastifyRequestWithUser, response: FastifyReply) {
    const authorizartionBearer = request.headers['authorization'] ?? ''

    if (!authorizartionBearer.startsWith('Bearer')) {
        return response.status(401).send({
            error: 'Unauthorized.',
        })
    }

    const token_uuid = authorizartionBearer.split(' ')[1]

    const user = await knex('user_tokens as ut')
        .join('users as u', 'u.id', '=', 'ut.user_id')
        .where('ut.token_uuid', token_uuid)
        .first('u.*')

    if (!token_uuid || !user) {
        return response.status(401).send({
            error: 'Unauthorized.',
        })
    }

    request.user = {
        id: user.id,
        user_name: user.user_name,
    }
}
