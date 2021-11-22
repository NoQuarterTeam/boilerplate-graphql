import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { User } from "../user.model"

@ObjectType()
export class UsersResponse extends ConnectionResponse(() => [User]) {}
