export class ValueObject<Props> {
  get value() {
    return this._value
  }

  constructor(private _value: Props) {}

  public equals(outher: ValueObject<Props>) {
    return outher.value === this.value
  }
}
