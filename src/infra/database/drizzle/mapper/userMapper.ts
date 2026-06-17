import { UniqueEntityID } from '@/core/entities/value-objects/UniqueEntityID'
import { User } from '@/domain/user/enterprise/entities/User'
import type { userDB } from '../@types/userDB'

export const userMapper = (user: userDB): User => {
  return User.create(
    {
      username: user.username,
      email: user.email,
      passwordHash: user.passwordHash,
      profilePhotoUrl: user.profilePhotoUrl ?? undefined,
      bio: user.bio ?? undefined,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    new UniqueEntityID(user.id)
  )
}
