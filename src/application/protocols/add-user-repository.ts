import { User } from '@/domain/models/user'

export interface AddUserRepository {
  add: (user: User) => Promise<User | null>
}
