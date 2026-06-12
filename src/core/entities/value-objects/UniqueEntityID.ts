import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private _value: string

  get value() {
    return this._value
  }

  constructor(value?: string) {
    this._value = value ?? randomUUID()
  }

  public equals(id: UniqueEntityID) {
    return id.value === this.value
  }
}
