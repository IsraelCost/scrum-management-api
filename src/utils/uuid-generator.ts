import * as uuid from 'uuid'
import { UUIDGenerator } from '@/application/protocols'

export class UUIDGeneratorAdapter implements UUIDGenerator {
  generate (): string {
    const generatedUUID = uuid.v4()
    return generatedUUID
  }
}
