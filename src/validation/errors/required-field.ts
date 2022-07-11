import { ValidationError } from '../protocols/validation-error'

export class RequiredFieldError implements ValidationError {
  name: string
  message: string

  constructor (readonly fieldName: string) {
    this.name = 'RequiredFieldError'
    this.message = `field "${fieldName}" is required`
  }
}
