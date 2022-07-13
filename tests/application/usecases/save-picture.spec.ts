import { ImageUploader, UUIDGenerator } from '@/application/protocols'
import { SavePictureUsecase } from '@/domain/usecases'
import { SavePicture } from '@/application/usecases/save-picture'

interface SutTypes {
  sut: SavePictureUsecase
  imageUploaderStub: ImageUploader
  uuidGeneratorStub: UUIDGenerator
}

const makeUUIDGeneratorStub = (): UUIDGenerator => {
  class UUIDGeneratorStub implements UUIDGenerator {
    generate (): string {
      return 'uuid'
    }
  }
  return new UUIDGeneratorStub()
}

const makeImageUploaderStub = (): ImageUploader => {
  class ImageUploaderStub implements ImageUploader {
    async upload (path: string, buffer: Buffer): Promise<string> {
      return Promise.resolve('image_location')
    }
  }
  return new ImageUploaderStub()
}

const makeSut = (): SutTypes => {
  const uuidGeneratorStub = makeUUIDGeneratorStub()
  const imageUploaderStub = makeImageUploaderStub()
  const sut = new SavePicture(imageUploaderStub, uuidGeneratorStub)
  return {
    sut,
    imageUploaderStub,
    uuidGeneratorStub
  }
}

describe('SavePicture', () => {
  test('Should call uuid generator', async () => {
    const { sut, uuidGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(uuidGeneratorStub, 'generate')
    await sut.save('image_path', Buffer.from(''))
    expect(generateSpy).toHaveBeenCalledTimes(1)
  })

  test('Should throws if uuid generator throws', async () => {
    const { sut, uuidGeneratorStub } = makeSut()
    jest.spyOn(uuidGeneratorStub, 'generate').mockImplementationOnce(() => {
      throw new Error()
    })
    try {
      await sut.save('image_path', Buffer.from(''))
    } catch (error) {
      expect(error).toEqual(new Error())
    }
  })

  test('Should call image uploader with correct values', async () => {
    const { sut, imageUploaderStub } = makeSut()
    const uploadSpy = jest.spyOn(imageUploaderStub, 'upload')
    await sut.save('image_path', Buffer.from(''))
    expect(uploadSpy).toHaveBeenCalledTimes(1)
    expect(uploadSpy).toHaveBeenCalledWith('image_path', Buffer.from(''))
  })

  test('Should return uploaded image location', async () => {
    const { sut, imageUploaderStub } = makeSut()
    jest.spyOn(imageUploaderStub, 'upload').mockResolvedValueOnce('any_location')
    const imageLocation = await sut.save('image_path', Buffer.from(''))
    expect(imageLocation).toBe('any_location')
  })

  test('Should throws if uploader throws', () => {
    const { sut, imageUploaderStub } = makeSut()
    jest.spyOn(imageUploaderStub, 'upload').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.save('image_path', Buffer.from(''))
    expect(promise).rejects.toThrow(new Error())
  })
})
