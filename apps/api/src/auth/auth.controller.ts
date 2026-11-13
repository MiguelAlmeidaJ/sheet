import {
  Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { Public } from './auth.decorators';
import { OriginGuard } from './origin.guard';
import type { AuthenticatedRequest } from './session.guard';

const COOKIE = 'sheet_session';
const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @UseGuards(OriginGuard)
  @Post('register')
  async register(@Body() body: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.auth.register(body);
    res.cookie(COOKIE, token, options);
    return { user };
  }

  @Public()
  @UseGuards(OriginGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.auth.login(body);
    res.cookie(COOKIE, token, options);
    return { user };
  }

  @Get('me')
  me(@Req() req: AuthenticatedRequest) {
    return { user: req.user };
  }

  @UseGuards(OriginGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: AuthenticatedRequest, @Res({ passthrough: true }) res: Response) {
    await this.auth.logout(req.user.id);
    res.clearCookie(COOKIE, { path: '/', sameSite: 'lax', secure: options.secure, httpOnly: true });
    return { ok: true };
  }
}
