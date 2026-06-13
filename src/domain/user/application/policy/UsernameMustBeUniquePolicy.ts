import { ResourceAlreadyExists } from '@/core/errors/ResourceAlreadyExists'
import type { UserRepository } from '../repositories/UserRepository'

export class UsernameMustBeUniquePolicy {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(username: string): Promise<void> {
    const user = await this.userRepository.findByUsername(username)

    if (user) {
      throw new ResourceAlreadyExists('User with this username already exists')
    }
  }
}
