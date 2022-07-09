import { User } from '@/domain/models/user'
import { UserPostgreSQLRepository } from '@/infra/database/postgresql'
import { Connection } from '@/infra/database/postgresql/protocols'
import { PostgreSQLConnection } from '@/infra/database/postgresql/connection'

const makeFakerUser = (): User => {
  return new User('any_id', 'any_name', 'any_email', 'any_password', 'any_profile_picture_url')
}

const makeConnection = (): Connection => {
  return new PostgreSQLConnection()
}

describe('UserPostgreSQLRepository', () => {
  jest.setTimeout(10000)
  const OLD_ENV = process.env
  let connection

  beforeAll(() => {
    process.env = {
      DB_USER: 'postgres',
      DB_HOST: 'localhost',
      DB_NAME: 'scrum-management',
      DB_PASSWORD: '123456',
      DB_PORT: '5432'
    }
    connection = makeConnection()
    connection.open()
  })

  afterAll(async () => {
    await connection.query('delete from users')
    connection.close()
    process.env = OLD_ENV
  })

  describe('add user method', () => {
    test('Should add a new user in database', async () => {
      const sut = new UserPostgreSQLRepository(connection)
      const addedUser = await sut.add(makeFakerUser())
      expect(addedUser).toEqual(makeFakerUser())
    })
  })
})
