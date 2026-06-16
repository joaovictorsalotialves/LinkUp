import type { UserRepository } from '@/domain/user/application/repositories/UserRepository'
import type { User } from '@/domain/user/enterprise/entities/User'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async save(user: User): Promise<void> {
    this.items.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = this.items.filter(item => item.email.toString() === email)

    return user ?? null
  }

  async findByUsername(username: string): Promise<User | null> {
    const [user] = this.items.filter(item => item.username.toString() === username)

    return user ?? null
  }
}
