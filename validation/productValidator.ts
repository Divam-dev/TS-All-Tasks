import { Validator } from './types';
import { Product } from '../types/content';

export const productValidator: Validator<Product> = {
  validate: (data) => {
    const errors: string[] = [];
    if (!data.name || data.name.trim() === '') errors.push('Name is required.');
    if (data.price <= 0) errors.push('Price must be greater than 0.');
    return { isValid: errors.length === 0, errors };
  },
};