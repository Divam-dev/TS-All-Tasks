import { ContentOperations } from '../types/operations';
import { Article } from '../types/content';
import { article } from './data';

export const articleOps: ContentOperations<Article> = {
  create: (item) => ({ 
    ...item, 
    id: '1', 
    createdAt: new Date(), 
    updatedAt: new Date() 
  }),
  read: (id) => (id === '1' ? article : null),
  update: (id, data) => (id === '1' ? { ...article, ...data } : null),
  delete: (id) => id === '1',
};