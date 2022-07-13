import { ImageUploader } from '@/application/protocols'
import { SavePictureUsecase } from '@/domain/usecases'
import { SavePicture } from '@/application/usecases/save-picture'

interface SutTypes {
  sut: SavePictureUsecase
  imageUploaderStub: ImageUploader
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
  const imageUploaderStub = makeImageUploaderStub()
  const sut = new SavePicture(imageUploaderStub)
  return {
    sut,
    imageUploaderStub
  }
}

describe('SavePicture', () => {
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
