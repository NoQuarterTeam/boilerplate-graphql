import { AuthenticationError, UserInputError } from "apollo-server-express"
import chalk from "chalk"
import { ArgumentValidationError, MiddlewareFn } from "type-graphql"

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
