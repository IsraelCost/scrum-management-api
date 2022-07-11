import { ValidationError } from '@/validation/protocols/validation-error'
import { Http } from '../protocols'

export const badRequest = (errors: (ValidationError | Error)[]): Http.HttpResponse<any> => {
  return {
    body: errors,
    code: Http.HttpStatusCode.BAD_REQUEST
  }
}
