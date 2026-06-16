import { ResourceAlreadyExists } from '@/core/errors/ResourceAlreadyExists'
import type { HashProvider } from '@/core/provider/HashProvider'
import { HashFakeProvider } from '@/test/provider/HashFakeProvider'
import { InMemoryUsersRepository } from '@/test/repositories/inMemoryUsersRepository'
import { EmailMustBeUniquePolicy } from '../policy/EmailMustBeUniquePolicy'
import { UsernameMustBeUniquePolicy } from '../policy/UsernameMustBeUniquePolicy'
import { type CreateUserRequest, CreateUserUseCase } from './createUserUseCase'

let sut: CreateUserUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let hashFakeProvider: HashProvider
let usernameMustBeUniquePolicy: UsernameMustBeUniquePolicy
let emailMustBeUniquePolicy: EmailMustBeUniquePolicy

const makeCreateUserRequest = (
  createUserRequest: CreateUserRequest = {
    username: 'JohnDoe',
    email: 'john@example.com',
    password: 'password',
  }
): CreateUserRequest => {
  return {
    username: createUserRequest.username,
    email: createUserRequest.email,
    password: createUserRequest.password,
    bio: createUserRequest.bio,
    profilePhotoUrl: createUserRequest.profilePhotoUrl,
  }
}

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    hashFakeProvider = new HashFakeProvider()

    usernameMustBeUniquePolicy = new UsernameMustBeUniquePolicy(inMemoryUsersRepository)
    emailMustBeUniquePolicy = new EmailMustBeUniquePolicy(inMemoryUsersRepository)

    sut = new CreateUserUseCase(
      inMemoryUsersRepository,
      hashFakeProvider,
      usernameMustBeUniquePolicy,
      emailMustBeUniquePolicy
    )
  })

  it('should create a user', async () => {
    const createUserRequest = makeCreateUserRequest()
    const { user } = await sut.execute(createUserRequest)

    expect(user.id).toBeTruthy()
    expect(user.username).toBe('JohnDoe')
    expect(user.email).toBe('john@example.com')
    expect(user.status).toBe('pending')
    expect(user.createdAt).toBeTruthy()
    expect(user.updatedAt).toBeTruthy()
  })

  it('should save user in repository', async () => {
    const { user } = await sut.execute(makeCreateUserRequest())

    const savedUser = await inMemoryUsersRepository.findById(user.id.value)

    expect(user).toBe(savedUser)
    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })

  it('should hash password before saving', async () => {
    const createUserRequest = makeCreateUserRequest()
    const hashSpy = vi.spyOn(hashFakeProvider, 'hash')

    const { user } = await sut.execute(createUserRequest)

    expect(user.passwordHash).toBe(`hashed_${createUserRequest.password}`)
    expect(hashSpy).toHaveBeenCalledWith('password')
  })

  it('should create user with optional fields', async () => {
    const { user } = await sut.execute(
      makeCreateUserRequest({
        username: 'JohnDoe',
        email: 'john@example.com',
        password: 'password',
        profilePhotoUrl: 'photo.jpg',
        bio: 'My bio',
      })
    )

    expect(user.profilePhotoUrl).toBe('photo.jpg')
    expect(user.bio).toBe('My bio')
  })

  it('should not allow duplicated username', async () => {
    await sut.execute(makeCreateUserRequest({ username: 'JohnDoe', email: 'john@example.com', password: 'password' }))

    await expect(
      sut.execute(
        makeCreateUserRequest({
          username: 'JohnDoe',
          email: 'other@example.com',
          password: 'password',
        })
      )
    ).rejects.toBeInstanceOf(ResourceAlreadyExists)
  })

  it('should not allow duplicated email', async () => {
    await sut.execute(makeCreateUserRequest({ username: 'JohnDoe', email: 'john@example.com', password: 'password' }))

    await expect(
      sut.execute(
        makeCreateUserRequest({
          username: 'Other',
          email: 'john@example.com',
          password: 'password',
        })
      )
    ).rejects.toBeInstanceOf(ResourceAlreadyExists)
  })
})
