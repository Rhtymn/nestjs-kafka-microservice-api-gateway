import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '@app/constants';
import { UserRole } from '@app/interface';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
