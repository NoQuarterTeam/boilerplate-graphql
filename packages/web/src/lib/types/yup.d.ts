import { StringSchema, NumberSchema } from "yup"

declare module "yup" {
  interface StringSchema {
    nullIfEmpty(): StringSchema
  }
  interface NumberSchema {
    nullIfEmpty(): NumberSchema
  }
}
