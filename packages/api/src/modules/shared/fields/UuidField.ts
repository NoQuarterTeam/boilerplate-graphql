import { Field } from "type-graphql"
import { Column } from "typeorm"

import { composeMethodDecorators, MethodDecoratorFactory } from "./utils"

interface UuidFieldOptions {
  nullable?: boolean
  unique?: boolean
  graphql?: boolean
}

export function UuidField(args: UuidFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const uniqueOption = args.unique ? { unique: true } : {}

  const factories = []
  if (args.graphql !== false) {
    factories.push(
      Field(() => String, {
        ...nullableOption,
      }),
    )
  }
  factories.push(
    Column({
      type: "character varying",
      ...nullableOption,
      ...uniqueOption,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
