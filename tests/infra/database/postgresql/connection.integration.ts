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
})
