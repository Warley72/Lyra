import type { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';

import { AppError } from '../../../errors/appError.js';
import { createToken } from '../../../lib/jwt.js';
import {
  hashPassword,
  isPasswordHash,
  verifyLegacyPassword,
  verifyPassword,
} from '../../../lib/password.js';
import { UserRepository } from '../../users/repositories/userRepository.js';
import { prisma } from '../../../database/prisma.js';

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(128),
});

const userRepository = new UserRepository(prisma);

export class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const data = loginSchema.parse(request.body);
    const user = await userRepository.findByEmail(data.email);

    const passwordIsValid = user && (isPasswordHash(user.password)
      ? await verifyPassword(data.password, user.password)
      : verifyLegacyPassword(data.password, user.password));

    if (!passwordIsValid || !user) {
      throw new AppError('Invalid email or password.', 401);
    }

    if (!isPasswordHash(user.password)) {
      await userRepository.update(user.id, { password: await hashPassword(data.password) });
    }

    return reply.send({ token: createToken(user.id) });
  }
}
