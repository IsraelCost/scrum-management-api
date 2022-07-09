import { PostgreSQLConnection } from '@/infra/database/postgresql/connection'

describe('PostgreSQLConnection', () => {
  const OLD_ENV = process.env

  beforeAll(() => {
    process.env = {
      DB_USER: 'postgres',
      DB_HOST: 'localhost',
      DB_NAME: 'scrum-management',
      DB_PASSWORD: '123456',
      DB_PORT: '5432'
    } 
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  test('Should connect to server', async () => {
    const sut = new PostgreSQLConnection()
    const connected = await sut.open()
    expect(connected).toBeTruthy()
  })

  test('Should disconnect to server', async () => {
    const sut = new PostgreSQLConnection()
    const connected = await sut.open()
    expect(connected).toBeTruthy()
    const disconnected = await sut.close()
    expect(disconnected).toBeTruthy()
  })

  test('Should return rows from query', async () => {
    const sut = new PostgreSQLConnection()
    const connected = await sut.open()
    expect(connected).toBeTruthy()
    const deleteSql = 'delete from users'
    await sut.query(deleteSql)
    const insertSql = "insert into users (id, name, email, password, profilePictureUrl) values ('any_id', 'any_name', 'any_mail', 'any_password', 'any_url')"
    await sut.query(insertSql)
    const selectSql = 'select * from users'
    const result = await sut.query(selectSql)
    expect(result).toEqual([{ id: 'any_id', name: 'any_name', email: 'any_mail', password: 'any_password', profilepictureurl: 'any_url' }])
    const disconnected = await sut.close()
    expect(disconnected).toBeTruthy()
  })
})
