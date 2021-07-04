import * as Yup from "yup"

declare module "yup" {
  class StringSchema {
    nullIfEmpty(): Yup.StringSchema
  }
  class NumberSchema {
    nullIfEmpty(): Yup.NumberSchema
  }
  class NullableArraySchema {
    nullIfEmpty(): Yup.NullableArraySchema
  }
  class NotRequiredArraySchema {
    nullIfEmpty(): Yup.NotRequiredArraySchema
  }
  class ArraySchema {
    nullIfEmpty(): Yup.ArraySchema
  }
  class MixedSchema {
    nullIfEmpty(): Yup.MixedSchema
  }
}
