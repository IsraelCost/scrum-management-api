import bcrypt from 'bcrypt'
import { HasherAdapter } from '@/infra/cryptography'

jest.mock('bcrypt')

describe('HasherAdapter', () => {
  test('Should call bcrypt with correct value', () => {
    const sut = new HasherAdapter(10)
    const hashSpy = jest.spyOn(bcrypt, 'hashSync')
    sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 10)
  })

  test('Should return bcrypt hashed value', () => {
    const sut = new HasherAdapter(10)
    jest.spyOn(bcrypt, 'hashSync').mockReturnValueOnce('hashed_value')
    const hashedValue = sut.hash('any_value')
    expect(hashedValue).toBe('hashed_value')
  })
})
