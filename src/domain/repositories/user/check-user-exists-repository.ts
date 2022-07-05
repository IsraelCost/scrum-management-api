export interface CheckUserExistsRepository {
  exists: (userEmail: string) => Promise<boolean>
}
