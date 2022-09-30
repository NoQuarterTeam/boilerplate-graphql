import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Post } from "../post.model"

@ObjectType()
export class PostsResponse extends ConnectionResponse(() => [Post]) {}
