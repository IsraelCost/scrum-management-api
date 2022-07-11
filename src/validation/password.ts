import { WeakPasswordError } from './errors'
import { ConcreteValidation } from './protocols/validation'
import { ValidationError } from './protocols/validation-error'

export class PasswordValidation implements ConcreteValidation {
  constructor (readonly fields: string[]) {}

  validate (input: any): ValidationError[] {
    const errors: ValidationError[] = []
    if (input) {
      for (const field of this.fields) {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@_!#$^&*()<>?/}{[\]\\|~:]).{8,}$/.test(input[field])) errors.push(new WeakPasswordError(field))
      }
    }
    return errors
  }
}
