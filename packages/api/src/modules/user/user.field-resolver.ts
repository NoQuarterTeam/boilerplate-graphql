import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { S3_URL } from "../../lib/config"
import { UseCacheControl } from "../shared/middleware/UseCacheControl"
import { User } from "./user.model"

@Service()
@Resolver(() => User)
export default class UserFieldResolver {
  @FieldResolver(() => String)
  fullName(@Root() user: User) {
    if (!user.firstName && !user.lastName) return ""
    return (user.firstName + " " + user.lastName).trim()
  }

  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => String, { nullable: true })
  avatar(@Root() user: User) {
    if (!user.avatar) return null
    return S3_URL + user.avatar
  }
}
