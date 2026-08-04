import { FastifyInstance } from "fastify";

import { usersRoutes } from './modules/users/routes/userRoutes.js';


export async function routes(app: FastifyInstance) {
  app.get('/health', async (_request, reply) => {
    return reply.status(200).send({
      status: 'sinal que deu certo aqui',
    });
  });

  await app.register(usersRoutes);
}
