export class CannotCreateError extends Error {
  constructor () {
    super('Cannot create')
    this.name = 'CannotCreateError'
  }
}
