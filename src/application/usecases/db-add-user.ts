import { DBAddUserDTO } from '../dto'
import { UserAlreadyExistsError } from '../errors'
import { AddUserRepository, CheckUserExistsRepository } from '../protocols'

export class DBAddUser {
  constructor (
    private readonly addUserRepository: AddUserRepository,
    private readonly checkUserExistsRepository: CheckUserExistsRepository
  ) {}

  async add (input: DBAddUserDTO.Input): Promise<DBAddUserDTO.Output> {
    const userExists = await this.checkUserExistsRepository.exists(input.email)
    if (userExists) throw new UserAlreadyExistsError()
    await this.addUserRepository.add(input)
    return Promise.resolve(null)
  }
}
