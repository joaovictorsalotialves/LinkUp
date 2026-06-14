import type { Router } from 'express'
import { makeCreateUserControllerFactory } from '../factories/controllers/makeCreateUserControllerFactory'

export default (router: Router): void => {
  const createUserController = makeCreateUserControllerFactory()
  router.post('/users', createUserController.execute.bind(createUserController))
}
