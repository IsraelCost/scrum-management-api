export namespace DBAddUserDTO {
  export type Input = {
    name: string
    email: string
    password: string
    profilePictureUrl: string
  }

  export type Output = {
    id: string
    name: string
    email: string
    password: string
    profilePictureUrl: string
  }
}
