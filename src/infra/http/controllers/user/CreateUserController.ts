import type { Request, Response } from 'express'
import z from 'zod'
import type { CreateUserUseCase } from '@/domain/user/application/use-cases/createUserUseCase'
import { throwError } from '../../throwError'

const createUserBodySchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  profilePhotoUrl: z.string().url().optional(),
  bio: z.string().optional(),
})

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}
  async execute(request: Request, response: Response) {
    try {
      const { username, email, password, profilePhotoUrl, bio } = createUserBodySchema.parse(request.body)

      await this.createUserUseCase.execute({
        username,
        email,
        password,
        profilePhotoUrl,
        bio,
      })

      return response.status(201).send()
    } catch (error) {
      throwError(response, error as Error)
    }
  }
}
