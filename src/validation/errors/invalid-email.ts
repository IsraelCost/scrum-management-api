import { ValidationError } from '../protocols/validation-error'

export class InvalidEmailError implements ValidationError {
  name: string
  message: string

  constructor (readonly fieldName: string) {
    this.name = 'InvalidEmailError'
    this.message = `field "${fieldName}" is invalid`
  }
}
