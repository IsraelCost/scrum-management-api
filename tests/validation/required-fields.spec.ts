import { RequiredFieldsValidation } from '@/validation'
import { RequiredFieldError } from '@/validation/errors/required-field'

describe('RequiredFieldsValidation', () => {
  test('Should enter an error if value is not provided', () => {
    const sut = new RequiredFieldsValidation(['name'])
    const errors = sut.validate({})
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new RequiredFieldError('name'))
    expect(errors[0].name).toBe('RequiredFieldError')
    expect(errors[0].fieldName).toBe('name')
    expect(errors[0].message).toBe('field "name" is required')
  })

  test('Should enter an error if value is not provided but field is entered', () => {
    const sut = new RequiredFieldsValidation(['name'])
    const errors = sut.validate({ name: '' })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new RequiredFieldError('name'))
    expect(errors[0].name).toBe('RequiredFieldError')
    expect(errors[0].fieldName).toBe('name')
    expect(errors[0].message).toBe('field "name" is required')
  })

  test('Should enter 0 length error array if not empty values provided', () => {
    const sut = new RequiredFieldsValidation(['name'])
    const errors = sut.validate({ name: 'any_name' })
    expect(errors).toHaveLength(0)
  })
})
