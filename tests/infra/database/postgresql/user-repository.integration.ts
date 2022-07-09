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

  beforeAll(async () => {
    process.env = {
      DB_USER: 'postgres',
      DB_HOST: 'localhost',
      DB_NAME: 'scrum-management',
      DB_PASSWORD: '123456',
      DB_PORT: '5432'
    }
    connection = makeConnection()
    await connection.open()
    connection.query('delete from users')
  })

  afterAll(() => {
    connection.close()
    process.env = OLD_ENV
  })

  describe('add user method', () => {
    afterAll(async () => {
      await connection.query('delete from users')
    })

    test('Should add a new user in database', async () => {
      const sut = new UserPostgreSQLRepository(connection)
      const addedUser = await sut.add(makeFakerUser())
      expect(addedUser).toEqual(makeFakerUser())
    })
  })

  describe('exists user method', () => {
    afterAll(async () => {
      await connection.query('delete from users')
    })

    test('Should return false without user with email', async () => {
      const sut = new UserPostgreSQLRepository(connection)
      const userAlreadyExists = await sut.exists('any_email')
      expect(userAlreadyExists).toBe(false)
    })

    test('Should add a new user in database and check if it exists', async () => {
      const sut = new UserPostgreSQLRepository(connection)
      await sut.add(makeFakerUser())
      const userAlreadyExists = await sut.exists('any_email')
      expect(userAlreadyExists).toBe(true)
    })
  })
})
