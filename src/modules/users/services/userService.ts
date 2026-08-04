import { Prisma, User } from '@prisma/client';

import { UserRepository } from '../repositories/userRepository.js';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = await this.userRepository.create(data);

    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findMany(): Promise<User[]> {
    return this.userRepository.findMany();
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async delete(id: number): Promise<User> {
    return this.userRepository.delete(id);
  }
}
