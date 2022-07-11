import { RequiredFieldsValidation, ValidationComposite } from '@/validation'
import { RequiredFieldError } from '@/validation/errors'

describe('ValidationComposite', () => {
  test('Should call validations correctly', () => {
    const requiredFieldsValidation = new RequiredFieldsValidation(['name', 'email', 'password'])
    const sut = new ValidationComposite([requiredFieldsValidation])
    const validateSpy = jest.spyOn(requiredFieldsValidation, 'validate')
    sut.validate({ name: 'any_name', email: 'any_email', password: 'any_password' })
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith({ name: 'any_name', email: 'any_email', password: 'any_password' })
  })

  test('Should return [] if input falsy value', () => {
    const requiredFieldsValidation = new RequiredFieldsValidation(['name', 'email', 'password'])
    const sut = new ValidationComposite([requiredFieldsValidation])
    const errors = sut.validate(null)
    expect(errors).toHaveLength(0)
  })
  
  test('Should return RequiredFieldError', () => {
    const requiredFieldsValidation = new RequiredFieldsValidation(['name', 'email', 'password'])
    const sut = new ValidationComposite([requiredFieldsValidation])
    const errors = sut.validate({ name: 'any_name', email: 'any_email', password: '' })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new RequiredFieldError('password'))
  })
})
