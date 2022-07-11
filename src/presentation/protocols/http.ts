export namespace Http {
  export type HttpRequest = {
    body: any
  }

  export enum HttpStatusCode {
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    SERVER_ERROR = 500,
    OK = 200,
    CREATED = 201
  }

  export type HttpResponse<BodyType = any> = {
    body: BodyType
    code: HttpStatusCode
  }
}
