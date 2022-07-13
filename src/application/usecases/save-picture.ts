import { SavePictureUsecase } from '@/domain/usecases'
import { ImageUploader, UUIDGenerator } from '../protocols'

export class SavePicture implements SavePictureUsecase {
  constructor (
    private readonly imageUploader: ImageUploader,
    private readonly uuidGenerator: UUIDGenerator
  ) {}

  async save (path: string, buffer: Buffer): Promise<string> {
    this.uuidGenerator.generate()
    const imageLocation = await this.imageUploader.upload(path, buffer)
    return imageLocation
  }
}
