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
  get username(): string {
    return this.props.username
  }

  get email(): string {
    return this.props.email
  }

  get passwordHash(): string {
    return this.props.passwordHash
  }

  get profilePhotoUrl(): string | undefined {
    return this.props.profilePhotoUrl
  }

  get bio(): string | undefined {
    return this.props.bio
  }

  get status(): StatusUser {
    return this.props.status
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

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
