import { SignUpController } from '@/presentation/controllers/sign-up'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols/validation'
import { ValidationError } from '@/validation/protocols/validation-error'
import { RequiredFieldError } from '@/validation/errors'
import { badRequest } from '@/presentation/helpers'

interface SutTypes {
  sut: SignUpController
  validationStub: Validation
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validations = []

    validate (input: any): ValidationError[] {
      return []
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new SignUpController(validationStub)
  return {
    sut,
    validationStub
  }
}

const makeSignUpRequest = (): Http.HttpRequest => {
  return {
    body: { email: 'any_email', password: 'any_password', profilePictureBase64: 'any_profile_picture_viewer' }
  }
}

describe('SignUpController', () => {
  test('Should calls validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeSignUpRequest())
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith({ email: 'any_email', password: 'any_password', profilePictureBase64: 'any_profile_picture_viewer' })
  })

  test('Should returns a badRequest helper if any validation returns length more than one', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      return [new RequiredFieldError('email')]
    })
    const result = await sut.handle(makeSignUpRequest())
    expect(result).toEqual(badRequest([new RequiredFieldError('email')]))
  })
})
