import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserPayload } from '@app/interface/auth';

export const User = createParamDecorator(
  (_, context: ExecutionContext): UserPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
