import { FastifyRequest } from "fastify";
import { UserSessionInterface } from "../users";

export interface FastifyRequestWithUser extends FastifyRequest {
    user?: UserSessionInterface
}
