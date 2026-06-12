import { Entity } from '../../../../core/entities/Entity'
import type { HttpUrl } from '../../../../core/entities/value-objects/HttpUrl'
import type { UniqueEntityID } from '../../../../core/entities/value-objects/UniqueEntityID'
import type { StatusUser } from '../../../../core/types/StatusUser'
import type { Email } from '../value-objects/Email'
import type { PasswordHash } from '../value-objects/Password'
import type { Username } from '../value-objects/Username'

type UserProps = {
  username: Username
  email: Email
  password: PasswordHash
  profilePhotoUrl?: HttpUrl
  bio?: string
  status: StatusUser
  createdAt: Date
  updatedAt: Date
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    )

    return user
  }
}
