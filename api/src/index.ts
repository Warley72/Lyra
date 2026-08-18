import { FastifyInstance } from "fastify";

import { usersRoutes } from './modules/users/routes/userRoutes.js';
import { authRoutes } from './modules/auth/routes/authRoutes.js';
import { env } from './config/env.js';


export async function routes(app: FastifyInstance) {
  app.get('/health', async (_request, reply) => {
    return reply.status(200).send({
      status: 'sinal que deu certo aqui',
    });
  });

  await app.register(authRoutes, { prefix: env.API_PREFIX });
  await app.register(usersRoutes, { prefix: env.API_PREFIX });
}
