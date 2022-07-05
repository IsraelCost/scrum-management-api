import * as uuid from 'uuid'
import { UUIDGeneratorAdapter } from '@/utils/uuid-generator'

jest.mock('uuid')

describe('UUIDGeneratorAdapter', () => {
  test('Should calls uuid module', () => {
    const sut = new UUIDGeneratorAdapter()
    const v4Spy = jest.spyOn(uuid, 'v4')
    sut.generate()
    expect(v4Spy).toHaveBeenCalledTimes(1)
  })

  test('Should returns uuid module returned value', () => {
    const sut = new UUIDGeneratorAdapter()
    jest.spyOn(uuid, 'v4').mockReturnValueOnce('uuid')
    const generatedUUID = sut.generate()
    expect(generatedUUID).toBe('uuid')
  })
})
