import "reflect-metadata"
import "dotenv/config"
import express from "express"
import morgan from "morgan"

import { PORT } from "./config"

export class Server {
  private readonly _app: express.Application

  constructor() {
    this._app = express()
      .enable("trust proxy")
      .use(morgan("dev"))
  }

  protected get app(): express.Application {
    return this._app
  }

  async start() {
    this._app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT} 🚀`),
    )
  }
}
