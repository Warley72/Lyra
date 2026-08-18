import { Prisma, User } from '@prisma/client';

import { AppError } from '../../../errors/appError.js';
import { hashPassword } from '../../../lib/password.js';
import { UserRepository } from '../repositories/userRepository.js';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = await this.userRepository.create({
      ...data,
      password: await hashPassword(data.password),
    });

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new AppError('User not found.', 404);
    return user;
  }

  async findMany(): Promise<User[]> {
    return this.userRepository.findMany();
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    await this.findById(id);
    const password = typeof data.password === 'string' ? await hashPassword(data.password) : data.password;
    return this.userRepository.update(id, { ...data, password });
  }

  async delete(id: number): Promise<User> {
    await this.findById(id);
    return this.userRepository.delete(id);
  }
}
