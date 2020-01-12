import { ArgsType, Field, Int } from "type-graphql"

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 })
  skip?: number

  @Field(() => Int, { defaultValue: undefined, nullable: true })
  take?: number
}
