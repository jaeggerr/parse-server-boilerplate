import { isNullOrUndefined } from 'util'
export interface ValidationError {
  message: string
  info?: any
}

export class Validator<T> {
  public readonly errors: ValidationError[] = []
  public readonly propertyName: string

  get hasErrors (): boolean {
    return this.errors.length > 0
  }

  constructor (public readonly value: T | null | undefined, propertyName?: string) {
    this.propertyName = propertyName || 'property'
  }

  hasValue (): this {
    if (isNullOrUndefined(this.value)) {
      this.errors.push({
        message: `${this.propertyName} is not set.`
      })
    }
    return this
  }

  errorMessages (): string {
    return this.errors.map((error) => {
      return error.message
    }).join('\n')
  }
}

export class NumberValidator extends Validator<number> {
  isNumber (): this {
    if (isNullOrUndefined(this.value) || Number.isNaN(this.value)) {
      this.errors.push({
        message: `${this.propertyName} is not a valid number.`
      })
    }
    return this
  }

  isPositive (orZero: boolean = false): this {
    if (isNullOrUndefined(this.value) || this.value < 0 || (!orZero && this.value === 0)) {
      this.errors.push({
        message: `${this.propertyName} is not a positive number.`
      })
    }
    return this
  }

  isNegative (orZero: boolean = false): this {
    if (isNullOrUndefined(this.value) || this.value > 0 || (!orZero && this.value === 0)) {
      this.errors.push({
        message: `${this.propertyName} is not a negative number.`
      })
    }
    return this
  }

  isGreaterOrEqualTo (value: number): this {
    if (isNullOrUndefined(this.value) || this.value < value) {
      this.errors.push({
        message: `${this.propertyName} must be greater or equal to ${value}.`
      })
    }
    return this
  }

  isLowerOrEqualTo (value: number): this {
    if (isNullOrUndefined(this.value) || this.value > value) {
      this.errors.push({
        message: `${this.propertyName} must be lower or equal to ${value}.`
      })
    }
    return this
  }

  isGreaterThan (value: number): this {
    if (isNullOrUndefined(this.value) || this.value <= value) {
      this.errors.push({
        message: `${this.propertyName} must be greater than ${value}.`
      })
    }
    return this
  }

  isLowerThan (value: number): this {
    if (isNullOrUndefined(this.value) || this.value >= value) {
      this.errors.push({
        message: `${this.propertyName} must be lower than ${value}.`
      })
    }
    return this
  }

  isEqualTo (value: number): this {
    if (this.value !== value) {
      this.errors.push({
        message: `${this.propertyName} must be equal to ${value}.`
      })
    }
    return this
  }
}
