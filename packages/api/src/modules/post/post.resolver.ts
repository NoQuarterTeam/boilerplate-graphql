import { Args, Query, Resolver } from "type-graphql"
import { Service } from "typedi"

import { FindFirstPostArgs, FindManyPostArgs } from "@generated"

import { prisma } from "../../lib/prisma"
import { Post } from "./post.model"
import { PostsResponse } from "./responses/posts.response"

@Service()
@Resolver(() => Post)
export default class PostResolver {
  @Query(() => Post, { nullable: true })
  async post(@Args() args: FindFirstPostArgs): Promise<Post | null> {
    return await prisma.post.findFirst(args)
  }

  @Query(() => PostsResponse)
  async posts(@Args() args: FindManyPostArgs): Promise<PostsResponse> {
    const items = await prisma.post.findMany(args)
    const count = await prisma.post.count({ ...args, take: undefined, skip: undefined })
    return { items, count }
  }
}
