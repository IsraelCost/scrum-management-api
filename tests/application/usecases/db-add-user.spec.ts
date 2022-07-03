import { DBAddUser } from '@/application/usecases'
import { DBAddUserDTO } from '@/application/dto'
import { AddUserRepository } from '@/application/protocols'
import { User } from '@/domain/models/user'

interface SutTypes {
  sut: DBAddUser
  addUserRepositoryStub: AddUserRepository
}

const makeAddUserRepositoryStub = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add (input: User): Promise<User> {
      return Promise.resolve(null)
    }
  }
  return new AddUserRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = makeAddUserRepositoryStub()
  const sut = new DBAddUser(addUserRepositoryStub)
  return {
    sut,
    addUserRepositoryStub
  }
}

const makeFakerDTO = (): DBAddUserDTO.Input => {
  return {
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    profilePictureUrl: 'any_profile_picture_url'
  }
}

describe('DBAddUser usecase', () => {
  test('Should call addUserRepository method with user', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addUserRepositoryStub, 'add')
    const user = makeFakerDTO()
    await sut.add(user)
    expect(addSpy).toHaveBeenCalledWith(user)
  })
})
