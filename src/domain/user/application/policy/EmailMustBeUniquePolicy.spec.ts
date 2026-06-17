import { ResourceAlreadyExists } from '@/core/errors/ResourceAlreadyExists'
import { makeUser } from '@/test/factories/makeUser'
import { InMemoryUsersRepository } from '@/test/repositories/inMemoryUsersRepository'
import { EmailMustBeUniquePolicy } from './EmailMustBeUniquePolicy'

let sut: EmailMustBeUniquePolicy
let inMemoryUsersRepository: InMemoryUsersRepository

describe('EmailMustBeUniquePolicy', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EmailMustBeUniquePolicy(inMemoryUsersRepository)
  })

  it('should not throw when email does not exist', async () => {
    await expect(sut.validate('john@example.com')).resolves.not.toThrow()
  })

  it('should throw ResourceAlreadyExists when email already exists', async () => {
    await inMemoryUsersRepository.create(makeUser())

    await expect(sut.validate('john@example.com')).rejects.toBeInstanceOf(ResourceAlreadyExists)
  })
})
