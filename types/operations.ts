import { BaseContent } from './base';

export type ContentOperations<T extends BaseContent> = {
  create: (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => T;
  read: (id: string) => T | null;
  update: (id: string, data: Partial<T>) => T | null;
  delete: (id: string) => boolean;
};