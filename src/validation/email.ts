import { InvalidEmailError } from './errors'
import { ConcreteValidation } from './protocols/validation'
import { ValidationError } from './protocols/validation-error'

export class EmailValidation implements ConcreteValidation {
  private readonly emailRule = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor (readonly fields: string[]) {}

  validate (input: any): ValidationError[] {
    const errors: ValidationError[] = []
    if (input) {
      for (const field of this.fields) {
        if (!this.emailRule.test(input[field])) errors.push(new InvalidEmailError(field))
      }
    }
    return errors
  }
}
