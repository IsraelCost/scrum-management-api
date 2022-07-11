import { Validation } from './protocols/validation'
import { ValidationError } from './protocols/validation-error'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (input: any): ValidationError[] {
    const errors: ValidationError[] = []
    if (input) {
      for (const validation of this.validations) {
        const errorsByValidation = validation.validate(input)
        errors.push(...errorsByValidation)
      }
    }
    return errors
  }
}
