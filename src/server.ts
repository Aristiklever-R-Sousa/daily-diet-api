import fastify from "fastify";
import { UsersRoutes } from "./routes/users";
import { MeatsRoutes } from "./routes/meal";

const app = fastify()

app.register(UsersRoutes, {
    prefix: 'users',
})

app.register(MeatsRoutes, {
    prefix: 'meats',
})

app.listen({
    host: '0.0.0.0',
    port: 3000,
}).then((app) => console.log('Listening on port 3000'))
