import { eq } from 'drizzle-orm/pg-core/expressions'
import type { UserRepository } from '@/domain/user/application/repositories/UserRepository'
import { User } from '@/domain/user/enterprise/entities/User'
import { db } from '../client'
import { schemas } from '../schemas'

export class UserPostgresqlRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await db.insert(schemas.users).values({
      id: user.id.value,
      username: user.username,
      email: user.email,
      passwordHash: user.passwordHash,
      bio: user.bio,
      profilePhotoUrl: user.profilePhotoUrl,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(schemas.users).where(eq(schemas.users.email, email))

    if (!user) {
      return null
    }

    return User.create({
      username: user.username,
      email: user.email,
      passwordHash: user.passwordHash,
      profilePhotoUrl: user.profilePhotoUrl ?? undefined,
      bio: user.bio ?? undefined,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  async findByUsername(username: string): Promise<User | null> {
    const [user] = await db.select().from(schemas.users).where(eq(schemas.users.username, username))

    if (!user) {
      return null
    }

    return User.create({
      username: user.username,
      email: user.email,
      passwordHash: user.passwordHash,
      profilePhotoUrl: user.profilePhotoUrl ?? undefined,
      bio: user.bio ?? undefined,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }
}
