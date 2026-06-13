import { randomUUID } from 'node:crypto'
import { ValueObject } from './ValueObjects'

export class UniqueEntityID extends ValueObject<UniqueEntityID> {
  constructor(value?: string) {
    super(new UniqueEntityID(value ?? randomUUID()))
  }
}
