import { ValidationResult, Validator } from './types';

export class CompositeValidator<T> {
  private validators: Validator<T>[] = [];

  addValidator(validator: Validator<T>) {
    this.validators.push(validator);
  }

  validate(data: T): ValidationResult {
    const errors: string[] = [];
    
    for (const validator of this.validators) {
      const result = validator.validate(data);
      if (!result.isValid && result.errors) {
        errors.push(...result.errors);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }
}