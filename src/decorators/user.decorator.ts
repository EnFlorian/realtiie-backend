import { ConsoleLogger, createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserInfo {
  email: string;
  userId: number;
  iat: number;
}

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
