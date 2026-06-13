export class ResourceAlreadyExists extends Error {
  constructor(message: string = 'Resource already exists') {
    super(message)
    this.name = 'ResourceAlreadyExists'
  }
}
