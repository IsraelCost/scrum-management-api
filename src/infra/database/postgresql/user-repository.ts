import { User } from '@/domain/models/user'
import { AddUserRepository, CheckUserExistsRepository } from '@/domain/repositories/user'
import { Connection } from './protocols'

export class UserPostgreSQLRepository implements AddUserRepository, CheckUserExistsRepository {
  constructor (readonly connection: Connection) {}

  async add (user: User): Promise<User> {
    const SQL = `insert into users (id, name, email, password, profilePictureUrl) values ('${user.id}', '${user.name}', '${user.email}', '${user.password}', '${user.profilePictureUrl}')`
    await this.connection.query(SQL)
    return user
  }

  async exists (email: string): Promise<boolean> {
    const SQL = `select * from users where email='${email}'`
    const rows = await this.connection.query(SQL)
    return rows.length > 0
  }
}
