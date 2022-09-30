import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { prisma } from "../../lib/prisma"
import { User } from "../user/user.model"
import { Post } from "./post.model"

@Service()
@Resolver(() => Post)
export default class PostFieldResolver {
  @FieldResolver(() => User)
  async author(@Root() post: Post) {
    return await prisma.post.findUnique({ where: { id: post.id } }).author()
  }
}
