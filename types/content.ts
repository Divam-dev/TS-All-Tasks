import { BaseContent } from './base';

export interface Article extends BaseContent {
  title: string;
  author: string;
  content: string;
}

export interface Product extends BaseContent {
  name: string;
  price: number;
  description: string;
  availability: 'in stock' | 'out of stock';
}