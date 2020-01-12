import { ManualFieldError } from "react-hook-form"

export interface ValidationError {
  property: string
  constraints: { [key: string]: string }
}

export function formatValidations(
  errors: ValidationError[],
): ManualFieldError<any>[] {
  return errors.map(error => ({
    name: error.property,
    type: error.property,
    types: error.constraints,
  }))
}
