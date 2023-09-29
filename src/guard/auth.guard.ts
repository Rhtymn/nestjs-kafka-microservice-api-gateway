import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../auth/service/auth.service';
import { ValidateTokenResponse } from '@app/interface/auth';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@app/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token: string | undefined | null =
      request.headers?.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const isValid: ValidateTokenResponse = await this.authService.validateToken(
      { token },
    );

    if (isValid.status === HttpStatus.OK) {
      request.user = isValid.payload;
      return true;
    }

    return false;
  }
}
