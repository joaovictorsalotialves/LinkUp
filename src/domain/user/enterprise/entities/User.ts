import { Entity } from '../../../../core/entities/Entity'
import type { UniqueEntityID } from '../../../../core/entities/value-objects/UniqueEntityID'
import type { StatusUser } from '../../../../core/types/StatusUser'

type UserProps = {
  username: string
  email: string
  password: string
  profilePhotoUrl?: string
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
