import { Field, Int } from "type-graphql"
import { Column } from "typeorm"

import { composeMethodDecorators, MethodDecoratorFactory } from "./utils"

interface IntFieldOptions {
  nullable?: boolean
  default?: number
  graphql?: boolean
}

export function IntField(args: IntFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}
  const defaultOption =
    args.default === undefined ? {} : { default: args.default }
  const factories = []
  if (args.graphql !== false) {
    factories.push(
      Field(() => Int, {
        ...nullableOption,
      }),
    )
  }
  factories.push(
    Column({
      type: "int",
      ...nullableOption,
      ...defaultOption,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
