export class HttpUrl {
  private _value: string

  get value() {
    return this._value
  }

  private constructor(value: string) {
    this._value = value
  }

  static create(value: string) {
    if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) {
      throw new Error('Invalid URL format')
    }

    return new HttpUrl(value)
  }
}
