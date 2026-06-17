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

const makeCreateUserRequest = (createUserRequest?: CreateUserRequest): CreateUserRequest => {
  return {
    username: createUserRequest?.username ?? 'JohnDoe',
    email: createUserRequest?.email ?? 'john@example.com',
    password: createUserRequest?.password ?? 'password',
    bio: createUserRequest?.bio,
    profilePhotoUrl: createUserRequest?.profilePhotoUrl,
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

    expect(user.id.value).toBeTruthy()
    expect(user.createdAt).toBeTruthy()
    expect(user.updatedAt).toBeTruthy()
    expect(user).contain({
      username: 'JohnDoe',
      email: 'john@example.com',
      status: 'pending',
    })
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

    expect(user).contain({
      profilePhotoUrl: 'photo.jpg',
      bio: 'My bio',
    })
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
