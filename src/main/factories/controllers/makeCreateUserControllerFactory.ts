import { CreateUserUseCase } from '@/domain/user/application/use-cases/createUserUseCase'
import { HashBcryptProvider } from '@/infra/auth/HashBcryptProvider'
import { UserPostgresqlRepository } from '@/infra/database/drizzle/repositories/userPostgresqlRepository'
import { CreateUserController } from '@/infra/http/controllers/user/CreateUserController'
import { makeEmailMustBeUniquePolicyFactory } from '../policy/makeEmailMustBeUniquePolicyFactory'
import { makeUsernameMustBeUniquePolicyFactory } from '../policy/makeUsernameMustBeUniquePolicyFactory'

export const makeCreateUserControllerFactory = () => {
  const userPostgresqlRepository = new UserPostgresqlRepository()

  const hashBcryptProvider = new HashBcryptProvider()

  const emailMustBeUniquePolicy = makeEmailMustBeUniquePolicyFactory()
  const usernameMustBeUniquePolicy = makeUsernameMustBeUniquePolicyFactory()

  const createUserUseCase = new CreateUserUseCase(
    userPostgresqlRepository,
    hashBcryptProvider,
    usernameMustBeUniquePolicy,
    emailMustBeUniquePolicy
  )
  return new CreateUserController(createUserUseCase)
}
