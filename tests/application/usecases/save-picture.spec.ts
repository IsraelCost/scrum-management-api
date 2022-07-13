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
})
