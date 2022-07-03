import { DBAddUser } from '@/application/usecases'
import { DBAddUserDTO } from '@/application/dto'
import { AddUserRepository, CheckUserExistsRepository, Hasher } from '@/application/protocols'
import { User } from '@/domain/models/user'
import { UserAlreadyExistsError } from '@/application/errors'

interface SutTypes {
  sut: DBAddUser
  addUserRepositoryStub: AddUserRepository
  checkUserExistsRepositoryStub: CheckUserExistsRepository
  hasherStub: Hasher
}

const makeHasherStub = (): Hasher => {
  class HasherStub implements Hasher {
    hash (value: string): string {
      return 'hashed_value'
    }
  }
  return new HasherStub()
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
  const hasherStub = makeHasherStub()
  const sut = new DBAddUser(addUserRepositoryStub, checkUserExistsRepositoryStub, hasherStub)
  return {
    sut,
    addUserRepositoryStub,
    checkUserExistsRepositoryStub,
    hasherStub
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

  test('Should throws if addUserRepository throws', () => {
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
  
  test('Should throw an UserAlreadyExistsError if CheckUserExistsRepository returns true', () => {
    const { sut, checkUserExistsRepositoryStub } = makeSut()
    jest.spyOn(checkUserExistsRepositoryStub, 'exists').mockResolvedValueOnce(true)
    const user = makeFakerDTO()
    const promise = sut.add(user)
    expect(promise).rejects.toThrow(new UserAlreadyExistsError())
  })

  test('Should throws if CheckUserExistsRepository throws', () => {
    const { sut, checkUserExistsRepositoryStub } = makeSut()
    jest.spyOn(checkUserExistsRepositoryStub, 'exists').mockRejectedValue(new Error())
    const user = makeFakerDTO()
    const promise = sut.add(user)
    expect(promise).rejects.toThrow(new Error())
  })

  test('Should call Hasher with correct user password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    const user = makeFakerDTO()
    await sut.add(user)
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throws if Hasher throws', () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const user = makeFakerDTO()
    const promise = sut.add(user)
    expect(promise).rejects.toThrow(new Error())
  })
})
