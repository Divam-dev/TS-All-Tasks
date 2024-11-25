import { AccessControl, Role, Permission } from './types';
import { BaseContent } from '../types/base';

export const checkAccess = <T extends BaseContent>(
  accessControl: AccessControl<T>,
  role: Role,
  operation: keyof Permission
): boolean => {
  return accessControl.permissions[role][operation];
};