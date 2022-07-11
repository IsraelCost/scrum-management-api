import { Http } from './http'

export interface GeneralController {
  handle: (httpRequest: Http.HttpRequest) => Promise<Http.HttpResponse<any>>
}
