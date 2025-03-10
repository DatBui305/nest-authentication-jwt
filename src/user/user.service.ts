import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/auth.dto';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async createUser({ username, password, email }: RegisterDto) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}
