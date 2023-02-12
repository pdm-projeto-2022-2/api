import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { RolesGuard } from '../guards/roles-auth.guard';

export const IS_ADMIN_KEY = 'isAdmin';

export function IsAdmin(): <TFunction>(
  target: object | TFunction,
  propertyKey?: string | symbol,
) => void {
  return applyDecorators(
    SetMetadata(IS_ADMIN_KEY, true),
    UseGuards(RolesGuard),
  );
}
