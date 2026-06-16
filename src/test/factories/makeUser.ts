import type { UniqueEntityID } from '@/core/entities/value-objects/UniqueEntityID'
import type { Optional } from '@/core/utils/optional'
import { User, type UserProps } from '@/domain/user/enterprise/entities/User'

export const makeUser = (
  user: Optional<UserProps, keyof UserProps> = {
    username: 'JohnDoe',
    email: 'john@example.com',
    passwordHash: 'hash_password',
  },
  id?: UniqueEntityID
): User => {
  return User.create(
    {
      username: user.username as string,
      email: user.email as string,
      passwordHash: user.passwordHash as string,
      bio: user.bio,
      profilePhotoUrl: user.profilePhotoUrl,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    id
  )
}
