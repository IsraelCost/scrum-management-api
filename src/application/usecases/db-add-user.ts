import { User } from '@/domain/models/user'
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
    const user = new User('any_id', input.name, input.email, hashedPassword, input.profilePictureUrl)
    const createdUser = await this.addUserRepository.add(user)
    if (!createdUser) throw new Error('Cannot create user')
    return {
      id: 'any_id', 
      name: input.name, 
      email: input.email, 
      password: hashedPassword, 
      profilePictureUrl: input.profilePictureUrl
    }
  }
}
