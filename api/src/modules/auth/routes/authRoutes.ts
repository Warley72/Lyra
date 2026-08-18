import type { FastifyInstance } from 'fastify';

import { AuthController } from '../controllers/authController.js';

const authController = new AuthController();

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/login', authController.login.bind(authController));
}
