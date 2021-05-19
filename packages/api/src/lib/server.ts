import "reflect-metadata"
import "dotenv/config"
import express from "express"
import chalk from "chalk"
import morgan from "morgan"
import { Integrations } from "@sentry/tracing"
import * as Sentry from "@sentry/node"

import { IS_PRODUCTION, PORT, SENTRY_DSN } from "./config"

if (IS_PRODUCTION) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new Integrations.Express()],
    enabled: IS_PRODUCTION,
    tracesSampleRate: 1.0,
  })
}

export class Server {
  private readonly _app: express.Application

  readonly logger: {
    info: (message: string) => void
    error: (message: string) => void
  }

  constructor() {
    this._app = express()
      .enable("trust proxy")
      .use(
        morgan("dev", {
          skip: (req) => req.method === "OPTIONS",
          stream: { write: (message) => console.log(message + "\n\n") },
        }),
      )

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
    this._app.listen(PORT, () =>
      this.logger.info(`Server started at http://localhost:${PORT}/graphql 🚀` + "\n"),
    )
  }
}
