import {
  ConflictException, Injectable, UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Role } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { SessionUser } from './session.guard';

const publicUserSelect = {
  id: true, email: true, username: true, displayName: true,
  bio: true, avatarUrl: true, role: true, createdAt: true,
  sessionVersion: true,
} as const;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private async makeSession(user: { id: string; sessionVersion: number }) {
    return this.jwt.signAsync({ sub: user.id, ver: user.sessionVersion });
  }

  private sanitize(user: {
    id: string; email: string; username: string; displayName: string;
    bio: string | null; avatarUrl: string | null; role: Role;
    createdAt: Date; sessionVersion: number;
  }): SessionUser {
    const { sessionVersion: _version, ...safe } = user;
    return safe;
  }

  async register(input: RegisterDto) {
    const email = input.email.trim().toLowerCase();
    const username = input.username.trim().toLowerCase();
    const displayName = input.displayName.trim();
    if (displayName.length < 2) throw new ConflictException('Nome de exibição inválido.');
    const hash = await argon2.hash(input.password, { type: argon2.argon2id });
    try {
      const user = await this.prisma.user.create({
        data: { email, username, displayName, passwordHash: hash, role: Role.USER },
        select: publicUserSelect,
      });
      return { user: this.sanitize(user), token: await this.makeSession(user) };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('E-mail ou nome de usuário já cadastrado.');
      }
      throw error;
    }
  }

  async login(input: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email.trim().toLowerCase() },
      select: { ...publicUserSelect, passwordHash: true },
    });
    if (!user || !(await argon2.verify(user.passwordHash, input.password))) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }
    const { passwordHash: _hash, ...safeUser } = user;
    return { user: this.sanitize(safeUser), token: await this.makeSession(user) };
  }

  async logout(userId: string) {
    // Invalidate previously issued tokens across all devices.
    await this.prisma.user.update({
      where: { id: userId },
      data: { sessionVersion: { increment: 1 } },
    });
  }
}
