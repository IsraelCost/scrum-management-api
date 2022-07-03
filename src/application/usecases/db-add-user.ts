import { DBAddUserDTO } from '../dto'
import { AddUserRepository } from '../protocols'

export class DBAddUser {
  constructor (
    private readonly addUserRepository: AddUserRepository
  ) {}

  async add (input: DBAddUserDTO.Input): Promise<DBAddUserDTO.Output> {
    await this.addUserRepository.add(input)
    return null
  }
}
