import { Article, Product } from '../types/content';

export const article: Article = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft',
  title: 'Best article',
  author: 'Vadim',
  content: 'Big article',
};

export const product: Product = {
  id: '2',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'published',
  name: 'Product',
  price: 999,
  description: 'Test product',
  availability: 'in stock',
};