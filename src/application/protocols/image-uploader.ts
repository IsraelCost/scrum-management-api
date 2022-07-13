export interface ImageUploader {
  upload: (path: string, buffer: Buffer) => Promise<string>
}
