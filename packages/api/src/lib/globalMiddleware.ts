import { MiddlewareFn, ArgumentValidationError } from "type-graphql"
import { UserInputError } from "apollo-server-express"

export const ErrorInterceptor: MiddlewareFn = async ({}, next) => {
  try {
    return await next()
  } catch (err) {
    if (
      !(err instanceof ArgumentValidationError) &&
      !(err instanceof UserInputError)
    ) {
      // Error logging goes here
      console.log("Error interceptor:", err)
    }
    throw err
  }
}
