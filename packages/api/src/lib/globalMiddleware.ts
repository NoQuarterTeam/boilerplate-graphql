import * as Sentry from "@sentry/node"
import { AuthenticationError, UserInputError } from "apollo-server-express"
import chalk from "chalk"
import { ArgumentValidationError, MiddlewareFn } from "type-graphql"

import { IS_PRODUCTION } from "./config"

export const ErrorInterceptor: MiddlewareFn = async ({}, next) => {
  try {
    return await next()
  } catch (err) {
    if (
      !(err instanceof ArgumentValidationError) &&
      !(err instanceof UserInputError) &&
      !(err instanceof AuthenticationError)
    ) {
      if (IS_PRODUCTION) Sentry.captureException(err)
      console.log(`[${chalk.red("ERROR")}] `, err)
    }
    throw err
  }
}
