import { SetMetadata } from '@nestjs/common'

export const Roles = (...roles: TRoles[]) => SetMetadata('roles', roles)

export type TRoles = 'admin' | 'client'
