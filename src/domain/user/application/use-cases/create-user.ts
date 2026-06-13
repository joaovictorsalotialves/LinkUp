import type { HashProvider } from '../../../../core/provider/HashProvider'
import { User } from '../../enterprise/entities/User'
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
    private readonly hashProvider: HashProvider
  ) {}

  async execute({ username, email, password, profilePhotoUrl, bio }: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      const existingUserRegisterWithSameEmail = await this.userRepository.findByEmail(email)

      if (existingUserRegisterWithSameEmail) {
        throw new Error('User with this email already exists')
      }

      const existingUserRegisterWithSameUsername = await this.userRepository.findByUsername(username)

      if (existingUserRegisterWithSameUsername) {
        throw new Error('User with this username already exists')
      }

      const passwordHash = await this.hashProvider.hash(password)

      const user = User.create({ username, email, passwordHash, profilePhotoUrl, bio })
      await this.userRepository.create(user)

      return { user }
    } catch (error) {
      console.error('Error creating user:', error)
      throw new Error('Failed to create user')
    }
  }
}
