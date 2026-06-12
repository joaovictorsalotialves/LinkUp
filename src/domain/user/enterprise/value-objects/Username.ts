export class Username {
  private _value: string

  get value() {
    return this._value
  }

  private constructor(value: string) {
    this._value = value
  }

  static create(value: string) {
    if (value.length < 3 || value.length > 50) {
      throw new Error('Username must be between 3 and 50 characters long')
    }

    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      throw new Error('Username can only contain letters, numbers, and underscores')
    }

    return new Username(value)
  }
}
