import bcrypt from 'bcrypt'
import type { HashProvider } from '@/core/provider/HashProvider'

export class HashBcryptProvider implements HashProvider {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }
}
