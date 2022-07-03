import { DBAddUser } from '@/application/usecases'
import { DBAddUserDTO } from '@/application/dto'
import { AddUserRepository, CheckUserExistsRepository } from '@/application/protocols'
import { User } from '@/domain/models/user'

interface SutTypes {
  sut: DBAddUser
  addUserRepositoryStub: AddUserRepository
  checkUserExistsRepositoryStub: CheckUserExistsRepository
}

const makeCheckUserExistsRepositoryStub = (): CheckUserExistsRepository => {
  class CheckUserExistsRepositoryStub implements CheckUserExistsRepository {
    async exists (userEmail: string): Promise<boolean> {
      return Promise.resolve(false)
    }
  }
  return new CheckUserExistsRepositoryStub()
}

const makeAddUserRepositoryStub = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add (input: DBAddUserDTO.Input): Promise<User> {
      return Promise.resolve(null)
    }
  }
  return new AddUserRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = makeAddUserRepositoryStub()
  const checkUserExistsRepositoryStub = makeCheckUserExistsRepositoryStub()
  const sut = new DBAddUser(addUserRepositoryStub, checkUserExistsRepositoryStub)
  return {
    sut,
    addUserRepositoryStub,
    checkUserExistsRepositoryStub
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

  test('Should throws if addUserRepository throws', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    jest.spyOn(addUserRepositoryStub, 'add').mockRejectedValue(new Error())
    const user = makeFakerDTO()
    const promise = sut.add(user)
    expect(promise).rejects.toThrow(new Error())
  })
  
  test('Should call CheckUserExistsRepository with correct user email', async () => {
    const { sut, checkUserExistsRepositoryStub } = makeSut()
    const existsSpy = jest.spyOn(checkUserExistsRepositoryStub, 'exists')
    const user = makeFakerDTO()
    await sut.add(user)
    expect(existsSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })
})
