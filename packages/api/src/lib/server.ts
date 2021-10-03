import "reflect-metadata"
import "dotenv/config"

import * as Sentry from "@sentry/node"
import * as Tracing from "@sentry/tracing"
import chalk from "chalk"
import express from "express"
import morgan from "morgan"

import { IS_PRODUCTION, PORT, SENTRY_DSN } from "./config"

export class Server {
  private readonly _app: express.Application

  readonly logger: {
    info: (message: string) => void
    error: (message: string) => void
  }

  constructor() {
    this._app = express()
      .use(Sentry.Handlers.requestHandler())
      .use(Sentry.Handlers.tracingHandler())
      .enable("trust proxy")
      .use(
        morgan("dev", {
          skip: (req) => req.method === "OPTIONS",
          stream: { write: (message) => console.log(message + "\n\n") },
        }),
      )

    if (IS_PRODUCTION) {
      Sentry.init({
        dsn: SENTRY_DSN,
        integrations: [
          new Sentry.Integrations.Http({ tracing: true }),
          new Tracing.Integrations.Express({ app: this._app }),
        ],
        enabled: IS_PRODUCTION,
        tracesSampleRate: 1.0,
      })
    }
    this.logger = {
      info: this.info,
      error: this.error,
    }
  }

  protected error(message: string) {
    console.log(`[${chalk.red("ERROR")}] `, message)
  }
  protected info(message: string) {
    console.log(`[${chalk.blue("INFO")}] `, message)
  }

  protected get app(): express.Application {
    return this._app
  }

  start(): void {
    this._app
      .use(Sentry.Handlers.errorHandler())
      .listen(PORT, () => this.logger.info(`Server started at http://localhost:${PORT}/graphql 🚀` + "\n"))
  }
}
