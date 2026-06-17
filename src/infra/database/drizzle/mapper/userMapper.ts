import { UniqueEntityID } from '@/core/entities/value-objects/UniqueEntityID'
import { User } from '@/domain/user/enterprise/entities/User'

export const userMapper = (user: {
  id: string
  username: string
  email: string
  passwordHash: string
  profilePhotoUrl: string | null
  bio: string | null
  status: 'pending' | 'active' | 'inactive' | 'revoked'
  createdAt: Date
  updatedAt: Date
}): User => {
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
