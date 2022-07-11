import { Validation } from '@/validation/protocols/validation'
import { GeneralController, Http } from '../protocols'

export class SignUpController implements GeneralController {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: Http.HttpRequest): Promise<Http.HttpResponse> {
    this.validation.validate(httpRequest.body)
    return Promise.resolve(null)
  }
}
