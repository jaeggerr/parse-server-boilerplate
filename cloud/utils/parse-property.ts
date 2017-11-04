import { isUndefined } from 'util'
import * as Parse from 'parse/node'
import { Validator, ValidationError } from './validation'

export interface ParsePropertyOptions<T> {
  validate?: (property: ParseProperty<T>) => Validator<T>
}

export default class ParseProperty<T> {
  constructor (private parent: Parse.Object, public readonly key: string, private options: ParsePropertyOptions<T> = {}) {}

  isDirty (): boolean {
    return this.parent.dirtyKeys().includes(this.key)
  }

  get value (): T | undefined | null {
    return this.parent.get(this.key)
  }

  set value (value: T | undefined | null) {
    if (isUndefined(value)) {
      this.parent.unset(this.key)
    } else {
      this.parent.set(this.key, value)
    }
  }

  unset () {
    this.parent.unset(this.key)
  }

  validate (): Validator<T> {
    if (this.options.validate) return this.options.validate(this)
    return new Validator<T>(this.value, this.key)
  }
}
