import { SavePictureUsecase } from '@/domain/usecases'
import { ImageUploader, UUIDGenerator } from '../protocols'

export class SavePicture implements SavePictureUsecase {
  constructor (
    private readonly imageUploader: ImageUploader,
    private readonly uuidGenerator: UUIDGenerator
  ) {}

  async save (path: string, buffer: Buffer): Promise<string> {
    const uuid = this.uuidGenerator.generate()
    const pathToUpload = `${path}/${uuid}`
    const imageLocation = await this.imageUploader.upload(pathToUpload, buffer)
    return imageLocation
  }
}
