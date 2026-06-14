import { UsernameMustBeUniquePolicy } from '@/domain/user/application/policy/UsernameMustBeUniquePolicy'
import { UserPostgresqlRepository } from '@/infra/database/drizzle/repositories/userPostgresqlRepository'

export const makeUsernameMustBeUniquePolicyFactory = () => {
  const userPostgresqlRepository = new UserPostgresqlRepository()
  return new UsernameMustBeUniquePolicy(userPostgresqlRepository)
}
