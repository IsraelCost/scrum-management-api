import { PasswordValidation } from '@/validation/password'
import { WeakPasswordError } from '@/validation/errors'

describe('PasswordValidation', () => {
  test('Should enter an WeakPasswordError if password not contains 8 caracthers', () => {
    const sut = new PasswordValidation(['password'])
    const errors = sut.validate({ password: 'aS#5' })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new WeakPasswordError('password'))
    expect(errors[0].name).toBe('WeakPasswordError')
    expect(errors[0].fieldName).toBe('password')
    expect(errors[0].message).toBe('your "password" is not strong enough')
  })

  test('Should enter an WeakPasswordError if password not contains numbers', () => {
    const sut = new PasswordValidation(['password'])
    const errors = sut.validate({ password: 'asdfASFG#$' })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new WeakPasswordError('password'))
    expect(errors[0].name).toBe('WeakPasswordError')
    expect(errors[0].fieldName).toBe('password')
    expect(errors[0].message).toBe('your "password" is not strong enough')
  })

  test('Should enter an WeakPasswordError if password not contains upper case', () => {
    const sut = new PasswordValidation(['password'])
    const errors = sut.validate({ password: 'asdf1235@' })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new WeakPasswordError('password'))
    expect(errors[0].name).toBe('WeakPasswordError')
    expect(errors[0].fieldName).toBe('password')
    expect(errors[0].message).toBe('your "password" is not strong enough')
  })

  test('Should enter an WeakPasswordError if password not contains lower case', () => {
    const sut = new PasswordValidation(['password'])
    const errors = sut.validate({ password: 'ASDF1234#' })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new WeakPasswordError('password'))
    expect(errors[0].name).toBe('WeakPasswordError')
    expect(errors[0].fieldName).toBe('password')
    expect(errors[0].message).toBe('your "password" is not strong enough')
  })
  
  test('Should enter an WeakPasswordError if password not contains especial caracthers', () => {
    const sut = new PasswordValidation(['password'])
    const errors = sut.validate({ password: 'ASDFsdf1234' })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new WeakPasswordError('password'))
    expect(errors[0].name).toBe('WeakPasswordError')
    expect(errors[0].fieldName).toBe('password')
    expect(errors[0].message).toBe('your "password" is not strong enough')
  })
  
  test('Should not enter any errors for strong password', () => {
    const sut = new PasswordValidation(['password'])
    const errors = sut.validate({ password: 'asDF1234@' })
    expect(errors).toHaveLength(0)
  })
})
