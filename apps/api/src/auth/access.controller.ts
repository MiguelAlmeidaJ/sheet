import { Controller, Get } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from './auth.decorators';

@Controller()
export class AccessController {
  @Get('moderation/access')
  @Roles(Role.MODERATOR, Role.SYSTEM_ADMIN)
  moderation() {
    return { allowed: true, scope: 'moderation' };
  }

  @Get('admin/access')
  @Roles(Role.SYSTEM_ADMIN)
  admin() {
    return { allowed: true, scope: 'admin' };
  }
}
