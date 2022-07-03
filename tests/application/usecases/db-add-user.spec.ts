import { DBAddUser } from '@/application/usecases'
import { DBAddUserDTO } from '@/application/dto/db-add-user'

interface SutTypes {
  sut: DBAddUser
}

const makeSut = (): SutTypes => {
  const sut = new DBAddUser()
  return {
    sut
  }
}

const makeFakerDTO = (): DBAddUserDTO.Input => {
  return {
    email: 'any_mail@mail.com',
    password: 'any_password'
  }
}

describe('DBAddUser usecase', () => {
  test('Should call add method with correct DTO', async () => {
    const { sut } = makeSut()
    const addSpy = jest.spyOn(sut, 'add')
    const user = makeFakerDTO()
    await sut.add(user)
    expect(addSpy).toHaveBeenCalledWith(user)
  })
})
