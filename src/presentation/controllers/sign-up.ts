import { Validation } from '@/validation/protocols/validation'
import { badRequest } from '../helpers'
import { GeneralController, Http } from '../protocols'

export class SignUpController implements GeneralController {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: Http.HttpRequest): Promise<Http.HttpResponse> {
    const validationErrors = this.validation.validate(httpRequest.body)
    if (validationErrors.length > 0) {
      return badRequest(validationErrors)
    }
    return Promise.resolve(null)
  }
}
