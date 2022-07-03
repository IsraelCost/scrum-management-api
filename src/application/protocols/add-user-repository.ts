import { User } from '@/domain/models/user'
import { DBAddUserDTO } from '../dto'

export interface AddUserRepository {
  add: (user: DBAddUserDTO.Input) => Promise<User>
}
