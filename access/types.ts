import { BaseContent } from '../types/base';

export type Role = 'admin' | 'editor' | 'viewer';

export type Permission = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

export type AccessControl<T extends BaseContent> = {
  permissions: Record<Role, Permission>;
};
