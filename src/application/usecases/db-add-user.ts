import { User } from '@/domain/models/user'
import { DBAddUserDTO } from '../dto'
import { UserAlreadyExistsError } from '../errors'
import { AddUserRepository, CheckUserExistsRepository, Hasher, UUIDGenerator } from '../protocols'

export class DBAddUser {
  constructor (
    private readonly addUserRepository: AddUserRepository,
    private readonly checkUserExistsRepository: CheckUserExistsRepository,
    private readonly hasher: Hasher,
    private readonly uuidGenerator: UUIDGenerator
  ) {}

  async add (input: DBAddUserDTO.Input): Promise<DBAddUserDTO.Output> {
    const userExists = await this.checkUserExistsRepository.exists(input.email)
    if (userExists) throw new UserAlreadyExistsError()
    const hashedPassword = this.hasher.hash(input.password)
    const userId = this.uuidGenerator.generate()
    const user = new User(userId, input.name, input.email, hashedPassword, input.profilePictureUrl)
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
