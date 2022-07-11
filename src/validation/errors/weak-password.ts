import { ValidationError } from '../protocols/validation-error'

export class WeakPasswordError implements ValidationError {
  name: string
  message: string

  constructor (readonly fieldName: string) {
    this.name = 'WeakPasswordError'
    this.message = `your "${fieldName}" is not strong enough`
  }
}
