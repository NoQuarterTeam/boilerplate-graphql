import { ObjectType } from "type-graphql"

import { User } from "@generated"

import { ConnectionResponse } from "../../shared/response/connection.response"

@ObjectType()
export class UsersResponse extends ConnectionResponse(() => [User]) {}
