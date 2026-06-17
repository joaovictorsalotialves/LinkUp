import type { StatusUser } from '@/core/@types/StatusUser'

export type userDB = {
  id: string
  username: string
  email: string
  passwordHash: string
  profilePhotoUrl: string | null
  bio: string | null
  status: StatusUser
  createdAt: Date
  updatedAt: Date
}
