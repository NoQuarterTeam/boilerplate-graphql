import * as Prisma from "@prisma/client"
import { Field, ObjectType } from "type-graphql"

import { Role } from "@generated"

import { BaseModel } from "../shared/base.model"
import { UseIsCurrentUser } from "./middleware/UseIsCurrentUser"

@ObjectType()
export class User extends BaseModel implements Partial<Prisma.User> {
  @UseIsCurrentUser()
  @Field()
  email: string

  password: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  bio?: string

  @Field(() => Role)
  role: Prisma.Role

  avatar: string | null
}
