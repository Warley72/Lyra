import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "../../../database/prisma.js";

import { UserRepository } from "../repositories/userRepository.js";
import { UserService } from "../services/userService.js";
import { z } from 'zod';
import { AppError } from '../../../errors/appError.js';

const createUserSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  password: z.string().min(6).max(128),
});

const updateUserSchema = createUserSchema.partial();

const idSchema = z.coerce.number().int().positive();

function serializeUser(user: { id: number; name: string; email: string; createdAt: Date; updatedAt: Date }) {
  return user;
}

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

export class UserController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const user = await userService.create(createUserSchema.parse(request.body));

        return reply.status(201).send(serializeUser(user));
    }

    async findMany(request: FastifyRequest, reply: FastifyReply) {
        const user = await userService.findById(request.userId!);

        return reply.send([serializeUser(user)]);
    }

    async findById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const id = idSchema.parse(request.params.id);
        this.ensureOwnUser(request, id);
        const user = await userService.findById(id);

        return reply.send(serializeUser(user));
    }

    async update(
        request: FastifyRequest<{
            Params: { id: string };
            Body: unknown;
        }>,
        reply: FastifyReply,
    ) {
        const id = idSchema.parse(request.params.id);
        this.ensureOwnUser(request, id);
        const user = await userService.update(id, updateUserSchema.parse(request.body));

        return reply.send(serializeUser(user));
    }

    async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const id = idSchema.parse(request.params.id);
        this.ensureOwnUser(request, id);
        await userService.delete(id);

        return reply.status(204).send();
    }

    private ensureOwnUser(request: FastifyRequest, userId: number) {
        if (request.userId !== userId) {
            throw new AppError('You cannot access another user.', 403);
        }
    }
}
