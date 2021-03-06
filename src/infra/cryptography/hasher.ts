import bcrypt from 'bcrypt'
import { Hasher } from '@/application/protocols'

export class HasherAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  hash (inputValue: string): string {
    const hashedValue = bcrypt.hashSync(inputValue, this.salt)
    return hashedValue
  }
}
