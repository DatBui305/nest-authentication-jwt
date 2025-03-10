import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto, RegisterDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const fakeUsers = [
  {
    id: 1,
    username: 'anson',
    password: 'password',
  },
  {
    id: 2,
    username: 'jack',
    password: 'password123',
  },
];

const tokenBlacklist = new Set<string>();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const findUser = await prisma.user.findUnique({ where: { username } });
    if (!findUser) return null;
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return null;
    }
    const { password: _, ...user } = findUser;
    return this.jwtService.sign(user);
  }

  logout(user: any) {
    const token = this.jwtService.sign(user);
    tokenBlacklist.add(token);
    return { message: 'User logged out successfully' };
  }

  isTokenBlacklisted(token: string): boolean {
    return tokenBlacklist.has(token);
  }
}
