export class Email {
  private _value: string

  get value() {
    return this._value
  }

  private constructor(value: string) {
    this._value = value
  }

  static create(value: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error('Invalid email format')
    }

    return new Email(value)
  }
}
