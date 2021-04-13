import { MiddlewareFn, ArgumentValidationError } from "type-graphql"
import { UserInputError, AuthenticationError } from "apollo-server-express"
import chalk from "chalk"

export const ErrorInterceptor: MiddlewareFn = async ({}, next) => {
  try {
    return await next()
  } catch (err) {
    if (
      !(err instanceof ArgumentValidationError) &&
      !(err instanceof UserInputError) &&
      !(err instanceof AuthenticationError)
    ) {
      console.log(`[${chalk.red("ERROR")}] `, err)
    }
    throw err
  }
}
