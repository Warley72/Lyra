import Fastify from "fastify";
import { routes } from "./index.js";

export const app = Fastify({
    logger: true,
});

app.register(routes);
