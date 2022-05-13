import { ApolloError } from "apollo-server-errors"

export class AppError extends ApolloError {
  constructor(message: string) {
    super(message, "APP_ERROR")
    Object.defineProperty(this, "name", { value: "AppError" })
  }
}
