import { BaseContent } from '../types/base';

export type Versioned<T extends BaseContent> = T & {
  version: number;
  previousVersions?: T[];
};