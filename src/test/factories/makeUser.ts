import { User } from '@/domain/user/enterprise/entities/User'

export const makeUser = (): User => {
  return User.create({
    username: 'JohnDoe',
    email: 'john@example.com',
    passwordHash: '123456',
  })
}