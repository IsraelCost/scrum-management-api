import { DBAddUser } from '@/application/usecases'
import { DBAddUserDTO } from '@/application/dto'
import { AddUserRepository, CheckUserExistsRepository, Hasher, UUIDGenerator } from '@/application/protocols'
import { User } from '@/domain/models/user'
import { UserAlreadyExistsError } from '@/application/errors'

interface SutTypes {
  sut: DBAddUser
  addUserRepositoryStub: AddUserRepository
  checkUserExistsRepositoryStub: CheckUserExistsRepository
  hasherStub: Hasher
  uuidGeneratorStub: UUIDGenerator
}

const makeUuidGeneratorStub = (): UUIDGenerator => {
  class UUIDGeneratorStub implements UUIDGenerator {
    generate (): string {
      return 'uuid'
    }
  }
  return new UUIDGeneratorStub()
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
    async add (input: User): Promise<User | null> {
      return Promise.resolve(input)
    }
  }
  return new AddUserRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = makeAddUserRepositoryStub()
  const checkUserExistsRepositoryStub = makeCheckUserExistsRepositoryStub()
  const hasherStub = makeHasherStub()
  const uuidGeneratorStub = makeUuidGeneratorStub()
  const sut = new DBAddUser(addUserRepositoryStub, checkUserExistsRepositoryStub, hasherStub, uuidGeneratorStub)
  return {
    sut,
    addUserRepositoryStub,
    checkUserExistsRepositoryStub,
    hasherStub,
    uuidGeneratorStub
  }
}

const makeFakerInputDTO = (): DBAddUserDTO.Input => {
  return {
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    profilePictureUrl: 'any_profile_picture_url'
  }
}

describe('DBAddUser usecase', () => {
  test('Should throws if addUserRepository throws', () => {
    const { sut, addUserRepositoryStub } = makeSut()
    jest.spyOn(addUserRepositoryStub, 'add').mockRejectedValue(new Error())
    const user = makeFakerInputDTO()
    const promise = sut.add(user)
    expect(promise).rejects.toThrow(new Error())
  })
  
  test('Should call CheckUserExistsRepository with correct user email', async () => {
    const { sut, checkUserExistsRepositoryStub } = makeSut()
    const existsSpy = jest.spyOn(checkUserExistsRepositoryStub, 'exists')
    const user = makeFakerInputDTO()
    await sut.add(user)
    expect(existsSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })
  
  test('Should throw an UserAlreadyExistsError if CheckUserExistsRepository returns true', () => {
    const { sut, checkUserExistsRepositoryStub } = makeSut()
    jest.spyOn(checkUserExistsRepositoryStub, 'exists').mockResolvedValueOnce(true)
    const user = makeFakerInputDTO()
    const promise = sut.add(user)
    expect(promise).rejects.toThrow(new UserAlreadyExistsError())
  })

  test('Should throws if CheckUserExistsRepository throws', () => {
    const { sut, checkUserExistsRepositoryStub } = makeSut()
    jest.spyOn(checkUserExistsRepositoryStub, 'exists').mockRejectedValue(new Error())
    const user = makeFakerInputDTO()
    const promise = sut.add(user)
    expect(promise).rejects.toThrow(new Error())
  })

  test('Should call Hasher with correct user password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    const user = makeFakerInputDTO()
    await sut.add(user)
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throws if Hasher throws', () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const user = makeFakerInputDTO()
    const promise = sut.add(user)
    expect(promise).rejects.toThrow(new Error())
  })

  test('Should call uuid generator', async () => {
    const { sut, uuidGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(uuidGeneratorStub, 'generate')
    const user = makeFakerInputDTO()
    await sut.add(user)
    expect(generateSpy).toHaveBeenCalledTimes(1)
  })

  test('Should call addUserRepository method with correct id and hashed password', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addUserRepositoryStub, 'add')
    const user = makeFakerInputDTO()
    await sut.add(user)
    expect(addSpy).toHaveBeenCalledWith(new User('uuid', user.name, user.email, 'hashed_value', user.profilePictureUrl))
  })

  test('Should return user on success', async () => {
    const { sut } = makeSut()
    const user = makeFakerInputDTO()
    const createdUser = await sut.add(user)
    expect(createdUser).toEqual({ ...user, password: 'hashed_value', id: 'any_id' })
  })
})
