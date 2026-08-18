import type { FastifyReply, FastifyRequest } from 'fastify';

import { AppError } from '../errors/appError.js';
import { verifyToken } from '../lib/jwt.js';

export async function authenticate(request: FastifyRequest, _reply: FastifyReply) {
  const authorization = request.headers.authorization;
  const [scheme, token] = authorization?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token) {
    throw new AppError('Authentication is required.', 401);
  }

  const payload = verifyToken(token);
  if (!payload) throw new AppError('Invalid or expired token.', 401);

  request.userId = payload.sub;
}
