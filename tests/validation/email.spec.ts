import { EmailValidation } from '@/validation'
import { InvalidEmailError } from '@/validation/errors'

describe('EmailValidation', () => {
  test('Should enter an InvalidEmailError if email is not correct', () => {
    const sut = new EmailValidation(['email'])
    const errors = sut.validate({ email: 'aS#5' })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new InvalidEmailError('email'))
    expect(errors[0].name).toBe('InvalidEmailError')
    expect(errors[0].fieldName).toBe('email')
    expect(errors[0].message).toBe('field "email" is invalid')
  })

  test('Should enter an InvalidEmailError if email is not correct 2.0', () => {
    const sut = new EmailValidation(['email'])
    const errors = sut.validate({ email: 'aS#5@' })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new InvalidEmailError('email'))
    expect(errors[0].name).toBe('InvalidEmailError')
    expect(errors[0].fieldName).toBe('email')
    expect(errors[0].message).toBe('field "email" is invalid')
  })

  test('Should enter an InvalidEmailError if email is not correct 3.0', () => {
    const sut = new EmailValidation(['email'])
    const errors = sut.validate({ email: 'aS#5@gmail' })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new InvalidEmailError('email'))
    expect(errors[0].name).toBe('InvalidEmailError')
    expect(errors[0].fieldName).toBe('email')
    expect(errors[0].message).toBe('field "email" is invalid')
  })
  
  test('Should not enter an InvalidEmailError if email is valid', () => {
    const sut = new EmailValidation(['email'])
    const errors = sut.validate({ email: 'aS#5@gmail.com' })
    expect(errors).toHaveLength(0)
  })
})
