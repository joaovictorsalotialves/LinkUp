import type { User } from '../../enterprise/entities/User'

export interface UserRepository {
  create(user: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
}
