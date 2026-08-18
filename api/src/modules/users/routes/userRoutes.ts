import type { FastifyInstance } from 'fastify';

import { UserController } from '../controllers/userController.js';
import { authenticate } from '../../../middlewares/authenticate.js';

const userController = new UserController();

export async function usersRoutes(app: FastifyInstance) {
    
  app.post('/users', userController.create.bind(userController));

  app.get('/users', { preHandler: authenticate }, userController.findMany.bind(userController));

  app.get<{ Params: { id: string } }>('/users/:id', { preHandler: authenticate }, userController.findById.bind(userController));

  app.put<{ Params: { id: string }; Body: unknown }>('/users/:id', { preHandler: authenticate }, userController.update.bind(userController));

  app.delete<{ Params: { id: string } }>('/users/:id', { preHandler: authenticate }, userController.delete.bind(userController));
}
