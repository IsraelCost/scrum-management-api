import { DBAddUserDTO } from '../dto'
import { UserAlreadyExistsError } from '../errors'
import { AddUserRepository, CheckUserExistsRepository, Hasher } from '../protocols'

export class DBAddUser {
  constructor (
    private readonly addUserRepository: AddUserRepository,
    private readonly checkUserExistsRepository: CheckUserExistsRepository,
    private readonly hasher: Hasher
  ) {}

  async add (input: DBAddUserDTO.Input): Promise<DBAddUserDTO.Output> {
    const userExists = await this.checkUserExistsRepository.exists(input.email)
    if (userExists) throw new UserAlreadyExistsError()
    const hashedPassword = this.hasher.hash(input.password)
    await this.addUserRepository.add({ ...input, password: hashedPassword })
    return Promise.resolve(null)
  }
}
