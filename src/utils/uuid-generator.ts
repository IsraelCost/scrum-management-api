import * as uuid from 'uuid'
import { UUIDGenerator } from '@/application/protocols'

export class UUIDGeneratorAdapter implements UUIDGenerator {
  generate (): string {
    uuid.v4()
    return ''
  }
}
