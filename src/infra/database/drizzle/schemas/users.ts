import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const userStatusEnum = pgEnum('user_status', ['pending', 'active', 'inactive', 'revoked'])

export const users = pgTable('users', {
  id: text().primaryKey(),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  passwordHash: text('password_hash').notNull().unique(),
  urlProfilePhoto: text('url_profile_photo'),
  description: text(),
  status: userStatusEnum().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
