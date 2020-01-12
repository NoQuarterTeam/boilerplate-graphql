import { Field, ArgsType } from "type-graphql"
import { PaginationArgs } from "./pagination.args"

@ArgsType()
export class TableArgs extends PaginationArgs {
  @Field({ nullable: true })
  search?: string

  @Field({ nullable: true, defaultValue: "createdAt" })
  orderBy?: string

  @Field({ nullable: true, defaultValue: "DESC" })
  order?: "ASC" | "DESC"
}
