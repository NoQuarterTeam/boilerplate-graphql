import { Field } from "type-graphql"
import { Column } from "typeorm"

import { composeMethodDecorators, MethodDecoratorFactory } from "./utils"

interface DateFieldOptions {
  nullable?: boolean
  graphql?: boolean
}

export function DateField(args: DateFieldOptions = {}): any {
  const nullableOption = args.nullable === true ? { nullable: true } : {}

  const factories = []
  if (args.graphql !== false) {
    factories.push(
      Field(() => Date, {
        ...nullableOption,
      }),
    )
  }
  factories.push(
    Column({
      type: "timestamp with time zone",
      ...nullableOption,
    }) as MethodDecoratorFactory,
  )

  return composeMethodDecorators(...factories)
}
