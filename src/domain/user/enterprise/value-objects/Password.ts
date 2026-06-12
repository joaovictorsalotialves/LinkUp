export class PasswordHash {
  private _value: string

  get value() {
    return this._value
  }

  private constructor(value: string) {
    this._value = value
  }

  static create(value: string) {
    if (value.length > 8) {
      throw new Error('Password must be at most 8 characters long')
    }

    return new PasswordHash(value)
  }
}
