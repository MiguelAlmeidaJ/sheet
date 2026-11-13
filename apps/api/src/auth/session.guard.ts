import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { IS_PUBLIC_KEY } from './auth.decorators';
import type { Request } from 'express';
import type { Role } from '@prisma/client';

export type SessionUser = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  role: Role;
  createdAt: Date;
};

export type AuthenticatedRequest = Request & { user: SessionUser };

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), context.getClass(),
    ])) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.cookies?.sheet_session;
    if (!token || typeof token !== 'string') throw new UnauthorizedException('Sessão necessária.');

    try {
      const payload = await this.jwt.verifyAsync<{ sub: string; ver: number }>(token, {
        issuer: 'sheet-api',
        audience: 'sheet-web',
      });
      if (typeof payload.sub !== 'string' || !Number.isInteger(payload.ver)) {
        throw new UnauthorizedException();
      }
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true, email: true, username: true, displayName: true,
          bio: true, avatarUrl: true, role: true, createdAt: true, sessionVersion: true,
        },
      });
      if (!user || user.sessionVersion !== payload.ver) throw new UnauthorizedException();
      const { sessionVersion: _sessionVersion, ...publicUser } = user;
      request.user = publicUser;
      return true;
    } catch {
      throw new UnauthorizedException('Sessão inválida ou expirada.');
    }
  }
}
