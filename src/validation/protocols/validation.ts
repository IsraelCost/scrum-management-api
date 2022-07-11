import { ValidationError } from './validation-error'

export interface Validation {
  validate: (input: any) => ValidationError[]
}

export interface ConcreteValidation extends Validation {
  fields: string[]
}
