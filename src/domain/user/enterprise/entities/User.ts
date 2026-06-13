import { Entity } from '@/core/entities/Entity'
import type { UniqueEntityID } from '@/core/entities/value-objects/UniqueEntityID'
import type { StatusUser } from '@/core/types/StatusUser'
import type { Optional } from '@/core/utils/optional'

type UserProps = {
  username: string
  email: string
  passwordHash: string
  profilePhotoUrl?: string
  bio?: string
  status: StatusUser
  createdAt: Date
  updatedAt: Date
}

export class User extends Entity<UserProps> {
  static create(props: Optional<UserProps, 'status' | 'createdAt' | 'updatedAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        status: props.status ?? 'pending',
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    )

    return user
  }
}
