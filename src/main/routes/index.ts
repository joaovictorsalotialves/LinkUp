import { type Express, Router } from 'express'
import userRoutes from './userRoutes'

export default (app: Express): void => {
  const router = Router()
  userRoutes(router)
  app.use('/linkup', router)
}
