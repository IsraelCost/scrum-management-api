import { SavePictureUsecase } from '@/domain/usecases'
import { ImageUploader } from '../protocols'

export class SavePicture implements SavePictureUsecase {
  constructor (private readonly imageUploader: ImageUploader) {}

  async save (path: string, buffer: Buffer): Promise<string> {
    this.imageUploader.upload(path, buffer)
    return Promise.resolve(null)
  }
}
