import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"
import jwt from "express-jwt"
import { useExpressServer, useContainer } from "routing-controllers"

import {
  CORS_OPTIONS,
  RESOLVER_PATHS,
  jwtAuth,
  CONTROLLER_PATHS,
} from "./lib/config"
import { ErrorInterceptor } from "./lib/globalMiddleware"
import { attachLoaders } from "./lib/attachLoaders"
import { ExpressContext } from "./lib/types"
import { authChecker } from "./lib/authChecker"
import { Server } from "./lib/server"
import { createDbConnection } from "./db"

class FullstackBoilerplate extends Server {
  constructor() {
    super()
    this.init()
  }

  async init() {
    await this.setupDb()
    await this.setUpAuth()
    await this.setupApollo()
    await this.setupControllers()
  }

  async setupDb() {
    await createDbConnection()
  }

  async setUpAuth() {
    this.app.use(jwt(jwtAuth))
    this.app.use((err: any, _: any, __: any, next: any) => {
      if (err.name === "UnauthorizedError") next()
    })
  }

  async setupApollo() {
    const schema = await buildSchema({
      authChecker,
      authMode: "null",
      container: Container,
      resolvers: [__dirname + RESOLVER_PATHS],
      globalMiddlewares: [ErrorInterceptor],
    })

    const apolloServer = new ApolloServer({
      context: ({ req, res }: ExpressContext) => ({
        req,
        res,
        loaders: attachLoaders(),
      }),
      introspection: true,
      playground: true,
      schema,
    })

    apolloServer.applyMiddleware({
      cors: CORS_OPTIONS,
      app: this.app,
    })
  }

  async setupControllers() {
    useContainer(Container)
    useExpressServer(this.app, {
      controllers: [__dirname + CONTROLLER_PATHS],
    })
  }
}

new FullstackBoilerplate().start()
