import { AccessControl } from '../access/types';
import { Article } from '../types/content';

export const articleAccessControl: AccessControl<Article> = {
  permissions: {
    admin: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    editor: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
    viewer: {
      create: false,
      read: true,
      update: false,
      delete: false,
    }
  }
};