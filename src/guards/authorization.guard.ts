import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp(),
      request = host.getRequest();
    const user = request['user'];
    const allowed = this.isAllowed(user.roles);
    if (!allowed) {
      throw new ForbiddenException();
    }
    return true;
  }

  isAllowed(userRoles: string[]) {
    let allowed = false;

    userRoles.forEach((userRole) => {
      if (!allowed && this.allowedRoles.includes(userRole)) {
        allowed = true;
      }
    });
    return allowed;
  }
}
