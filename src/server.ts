import fastify from "fastify";
import { UsersRoutes } from "./routes/users";

const app = fastify()

app.register(UsersRoutes, {
    prefix: 'users',
})

app.listen({
    host: '0.0.0.0',
    port: 3000,
}).then((app) => console.log('Listening on port 3000'))
