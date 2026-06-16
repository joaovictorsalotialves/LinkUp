import type { UniqueEntityID } from '@/core/entities/value-objects/UniqueEntityID'
import type { Optional } from '@/core/utils/optional'
import { User, type UserProps } from '@/domain/user/enterprise/entities/User'

export const makeUser = (user?: Optional<UserProps, keyof UserProps>, id?: UniqueEntityID): User => {
  return User.create(
    {
      username: user?.username ?? 'JohnDoe',
      email: user?.email ?? 'john@example.com',
      passwordHash: user?.passwordHash ?? 'hash_password',
      bio: user?.bio,
      profilePhotoUrl: user?.profilePhotoUrl,
      status: user?.status,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    },
    id
  )
}
