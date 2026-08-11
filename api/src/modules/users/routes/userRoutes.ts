import type { FastifyInstance } from 'fastify';

import { UserController } from '../controllers/userController.js';

const userController = new UserController();

export async function usersRoutes(app: FastifyInstance) {
    
  app.post('/users', userController.create.bind(userController));

  app.get('/users', userController.findMany.bind(userController));

  app.get('/users/:id', userController.findById.bind(userController));

  app.put('/users/:id', userController.update.bind(userController));

  app.delete('/users/:id', userController.delete.bind(userController));
}
