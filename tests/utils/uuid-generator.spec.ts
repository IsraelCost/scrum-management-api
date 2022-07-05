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
})
