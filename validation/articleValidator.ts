import { Validator } from './types';
import { Article } from '../types/content';

export const articleValidator: Validator<Article> = {
  validate: (data) => {
    const errors: string[] = [];
    if (!data.title || data.title.trim() === '') errors.push('Title is required.');
    if (!data.content || data.content.trim() === '') errors.push('Content is required.');
    return { isValid: errors.length === 0, errors };
  },
};