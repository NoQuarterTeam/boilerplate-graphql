import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { Role, User } from "@generated"

import { S3_URL } from "../../lib/config"
import { CurrentUser } from "../shared/currentUser"
import { UseCacheControl } from "../shared/middleware/UseCacheControl"

@Service()
@Resolver(() => User)
export default class UserFieldResolver {
  @FieldResolver(() => String)
  fullName(@Root() user: User) {
    if (!user.firstName && !user.lastName) return ""
    return (user.firstName + " " + user.lastName).trim()
  }

  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => String)
  email(@Root() user: User, @CurrentUser() currentUser: User) {
    if (currentUser.role !== Role.ADMIN && user.id !== currentUser.id) return ""
    return user.email
  }

  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => String, { nullable: true })
  avatar(@Root() user: User) {
    if (!user.avatar) return null
    return S3_URL + user.avatar
  }
}
