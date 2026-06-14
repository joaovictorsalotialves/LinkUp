import { EmailMustBeUniquePolicy } from '@/domain/user/application/policy/EmailMustBeUniquePolicy'
import { UserPostgresqlRepository } from '@/infra/database/drizzle/repositories/userPostgresqlRepository'

export const makeEmailMustBeUniquePolicyFactory = () => {
  const userPostgresqlRepository = new UserPostgresqlRepository()
  return new EmailMustBeUniquePolicy(userPostgresqlRepository)
}
