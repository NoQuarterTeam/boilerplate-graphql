import * as Prisma from "@prisma/client"
import { Field, ObjectType } from "type-graphql"

import { PostStatus } from "@generated"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Post extends BaseModel implements Prisma.Post {
  @Field()
  title: string
  @Field()
  content: string
  @Field()
  authorId: string

  @Field(() => PostStatus)
  status: Prisma.PostStatus
}
