import { ResourceAlreadyExists } from '@/core/errors/ResourceAlreadyExists'
import { makeUser } from '@/test/factories/makeUser'
import { InMemoryUsersRepository } from '@/test/repositories/inMemoryUsersRepository'
import { UsernameMustBeUniquePolicy } from './UsernameMustBeUniquePolicy'

let sut: UsernameMustBeUniquePolicy
let inMemoryUsersRepository: InMemoryUsersRepository

describe('UsernameMustBeUniquePolicy', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new UsernameMustBeUniquePolicy(inMemoryUsersRepository)
  })

  it('should not throw when username does not exist', async () => {
    await expect(sut.validate('JohnDoe')).resolves.not.toThrow()
  })

  it('should throw ResourceAlreadyExists when username already exists', async () => {
    await inMemoryUsersRepository.save(makeUser())

    await expect(sut.validate('JohnDoe')).rejects.toBeInstanceOf(ResourceAlreadyExists)
  })
})
