import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../database/prisma.js';

import { UserRepository } from '../repositories/userRepository.js';
import { UserService } from '../services/userService.js';

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const user = await userService.create(request.body as never);

    return reply.status(201).send(user);
  }

  async findMany(_request: FastifyRequest, reply: FastifyReply) {
    const users = await userService.findMany();

    return reply.send(users);
  }

  async findById(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ) {
    const user = await userService.findById(request.params.id);

    return reply.send(user);
  }

  async update(
    request: FastifyRequest<{
      Params: { id: number };
      Body: unknown;
    }>,
    reply: FastifyReply,
  ) {
    const user = await userService.update(
      request.params.id,
      request.body as never,
    );

    return reply.send(user);
  }

  async delete(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ) {
    await userService.delete(request.params.id);

    return reply.status(204).send();
  }
}
