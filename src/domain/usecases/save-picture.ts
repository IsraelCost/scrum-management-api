export interface SavePictureUsecase {
  save: (path: string, buffer: Buffer) => Promise<string>
}
