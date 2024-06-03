import { FastifyRequest } from "fastify";
import { UserInterface } from "../users";

export interface FastifyRequestWithUser extends FastifyRequest {
    user?: UserInterface
}
