import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import type { Request } from 'express';

// Cookie-authenticated mutations must originate from the trusted web app.
// Missing Origin is permitted for CLI clients, but browser cross-site form posts
// have a mismatching Origin and are rejected.
@Injectable()
export class OriginGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const origin = request.headers.origin;
    const expected = process.env.WEB_ORIGIN ?? 'http://localhost:3000';
    if (origin && origin !== expected) {
      throw new ForbiddenException('Origem não autorizada.');
    }
    return true;
  }
}
