import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../auth/service/auth.service';
import { ValidateTokenResponse } from '@app/interface/auth';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, ROLES_KEY } from '@app/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean | undefined = this.getMetadata<boolean>(
      context,
      IS_PUBLIC_KEY,
    );
    const roles: string[] | undefined = this.getMetadata<string[]>(
      context,
      ROLES_KEY,
    );

    if (isPublic) {
      return true;
    }

    if (roles && roles.length > 0) {
      const request = context.switchToHttp().getRequest();
      const token: string | undefined | null =
        request.headers?.authorization?.split(' ')[1];

      if (!token) {
        return false;
      }

      const isValid: ValidateTokenResponse =
        await this.authService.validateToken({ token });

      if (
        isValid.status === HttpStatus.OK &&
        roles.includes(isValid.payload.role)
      ) {
        request.user = isValid.payload;
        return true;
      }
    }

    return false;
  }

  // Create generic function to get metadata from reflector
  private getMetadata<T>(context: ExecutionContext, key: string): T {
    return this.reflector.getAllAndOverride<T>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
