import { UniqueEntityID } from '@/core/entities/value-objects/UniqueEntityID'
import { makeUser } from '@/test/factories/makeUser'

describe('User', () => {
  it('should create a user', () => {
    const user = makeUser()

    expect(user.id).toBeTruthy()
    expect(user.createdAt).toBeTruthy()
    expect(user.updatedAt).toBeTruthy()
    expect(user).contain({
      username: 'JohnDoe',
      email: 'john@example.com',
      passwordHash: 'hash_password',
      status: 'pending',
    })
  })

  it('should create user with optional properties', () => {
    const user = makeUser({
      profilePhotoUrl: 'photo.jpg',
      bio: 'My bio',
    })

    expect(user).contain({
      profilePhotoUrl: 'photo.jpg',
      bio: 'My bio',
    })
  })

  it('should use provided status', () => {
    const user = makeUser({ status: 'active' })

    expect(user.status).toBe('active')
  })

  it('should use provided dates', () => {
    const createdAt = new Date('2025-01-01')
    const updatedAt = new Date('2025-01-02')

    const user = makeUser({
      createdAt,
      updatedAt,
    })

    expect(user.createdAt).toEqual(createdAt)
    expect(user.updatedAt).toEqual(updatedAt)
  })

  it('should compare entities with same id', () => {
    const id = new UniqueEntityID('user-1')

    const user1 = makeUser({}, id)
    const user2 = makeUser({}, id)

    expect(user1.equals(user2)).toBe(true)
  })

  it('should compare entities with outher id', () => {
    const id1 = new UniqueEntityID('user-1')
    const id2 = new UniqueEntityID('user-2')

    const user1 = makeUser({}, id1)
    const user2 = makeUser({}, id2)

    expect(user1.equals(user2)).toBe(false)
  })
})
