import type { Response } from 'express'
import { ZodError } from 'zod'
import { ResourceAlreadyExists } from '@/core/errors/ResourceAlreadyExists'

export const throwError = (response: Response, error: Error) => {
  if (error instanceof ZodError) {
    return response.status(400).send({ message: 'Validation error', issues: error.format() })
  }

  if (error instanceof ResourceAlreadyExists) {
    return response.status(409).send({
      message: error.message,
    })
  }

  throw error
}
