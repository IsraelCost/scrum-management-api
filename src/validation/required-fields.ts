import { RequiredFieldError } from './errors/required-field'
import { ConcreteValidation } from './protocols/validation'
import { ValidationError } from './protocols/validation-error'

export class RequiredFieldsValidation implements ConcreteValidation {
  constructor (readonly fields: string[]) {}

  validate (input: any): ValidationError[] {
    const errors: ValidationError[] = []
    if (input) {
      for (const field of this.fields) {
        if (!input[field]) errors.push(new RequiredFieldError(field))
      }
    }
    return errors
  }
}
