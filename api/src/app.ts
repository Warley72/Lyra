import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./index.js";

export const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: "http://127.0.0.1:5500",
});

app.register(routes);
