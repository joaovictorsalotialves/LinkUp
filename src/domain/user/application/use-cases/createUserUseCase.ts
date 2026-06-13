import { InternalServerError } from '@/core/errors/InternalServerError'
import type { HashProvider } from '@/core/provider/HashProvider'
import { User } from '../../enterprise/entities/User'
import type { UserEmailMustBeUniquePolicy } from '../policy/UserEmailMustBeUniquePolicy'
import type { UsernameMustBeUniquePolicy } from '../policy/UsernameMustBeUniquePolicy'
import type { UserRepository } from '../repositories/UserRepository'

type CreateUserRequest = {
  username: string
  email: string
  password: string
  profilePhotoUrl?: string
  bio?: string
}

type CreateUserResponse = {
  user: User
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
    private readonly usernameMustBeUniquePolicy: UsernameMustBeUniquePolicy,
    private readonly userEmailMustBeUniquePolicy: UserEmailMustBeUniquePolicy
  ) {}

  async execute({ username, email, password, profilePhotoUrl, bio }: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      await this.usernameMustBeUniquePolicy.validate(username)
      await this.userEmailMustBeUniquePolicy.validate(email)

      const passwordHash = await this.hashProvider.hash(password)

      const user = User.create({ username, email, passwordHash, profilePhotoUrl, bio })
      await this.userRepository.create(user)

      return { user }
    } catch {
      throw new InternalServerError('Failed to create user')
    }
  }
}
