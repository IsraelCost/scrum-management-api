import { DBAddUserDTO } from '../dto'
import { AddUserRepository, CheckUserExistsRepository } from '../protocols'

export class DBAddUser {
  constructor (
    private readonly addUserRepository: AddUserRepository,
    private readonly checkUserExistsRepository: CheckUserExistsRepository
  ) {}

  async add (input: DBAddUserDTO.Input): Promise<DBAddUserDTO.Output> {
    await this.checkUserExistsRepository.exists(input.email)
    await this.addUserRepository.add(input)
    return null
  }
}
