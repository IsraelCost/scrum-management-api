import { SavePictureUsecase } from '@/domain/usecases'
import { ImageUploader } from '../protocols'

export class SavePicture implements SavePictureUsecase {
  constructor (private readonly imageUploader: ImageUploader) {}

  async save (path: string, buffer: Buffer): Promise<string> {
    const imageLocation = await this.imageUploader.upload(path, buffer)
    return imageLocation
  }
}
