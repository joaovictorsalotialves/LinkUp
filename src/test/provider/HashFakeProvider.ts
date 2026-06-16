import type { HashProvider } from '@/core/provider/HashProvider'

export class HashFakeProvider implements HashProvider {
  async hash(password: string): Promise<string> {
    return `hashed_${password}`
  }
}
