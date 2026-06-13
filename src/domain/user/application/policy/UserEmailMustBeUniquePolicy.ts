import type { UserRepository } from '../repositories/UserRepository'

export class UserEmailMustBeUniquePolicy {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email)

    if (user) {
      throw new Error('User with this email already exists')
    }
  }
}
