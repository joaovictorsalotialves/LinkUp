import { UniqueEntityID } from './value-objects/UniqueEntityID'

export abstract class Entity<Props> {
  protected props: Props
  private _id: UniqueEntityID

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  public equals(entity: Entity<Props>) {
    if (entity === this || entity.id === this._id) {
      return true
    }

    return false
  }
}
