import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./index.js";
import { env } from "./config/env.js";
import { AppError } from './errors/appError.js';

export const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(routes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ error: error.message });
  }

  if (error instanceof Error && error.name === 'ZodError') {
    return reply.status(400).send({ error: 'Invalid request data.' });
  }

  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
    return reply.status(409).send({ error: 'A record with this value already exists.' });
  }

  app.log.error(error);
  return reply.status(500).send({ error: 'Internal server error.' });
});
