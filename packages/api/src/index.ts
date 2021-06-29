import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"
import jwt from "express-jwt"

import { APOLLO_KEY, CORS_OPTIONS, IS_PRODUCTION, JWT_AUTH } from "./lib/config"
import { ErrorInterceptor } from "./lib/globalMiddleware"
import { ExpressContext } from "./lib/express"
import { Server } from "./lib/server"
import { formatResponse } from "./lib/formatResponse"
import { prisma } from "./lib/prisma"
import { loadPrismaHooks } from "./lib/hooks"
import { loadResolvers } from "./lib/loadResolvers"
import { currentUser } from "./lib/currentUser"

class App extends Server {
  constructor() {
    super()
    this.init().catch((error) => {
      this.logger.error(error)
      process.exit(1)
    })
  }

  async init() {
    await this.setUpDb()
    await this.setUpAuth()
    await this.setupApollo()
    this.start()
  }
  async setUpDb() {
    await prisma.$connect()
    loadPrismaHooks()
    this.logger.info("DB ready")
  }
  async setUpAuth() {
    this.app
      .use(jwt(JWT_AUTH))
      .use((err: any, _: any, __: any, next: any) => {
        if (err.name === "UnauthorizedError") next()
      })
      .use(currentUser)
    this.logger.info("Auth ready")
  }

  async setupApollo() {
    const schema = await buildSchema({
      container: Container,
      resolvers: loadResolvers(),
      globalMiddlewares: [ErrorInterceptor],
    })
    const apolloServer = new ApolloServer({
      context: ({ req, res }: ExpressContext) => ({ req, res, prisma }),
      formatResponse,
      introspection: !IS_PRODUCTION,
      playground: !IS_PRODUCTION,
      cacheControl: true,
      engine: { apiKey: IS_PRODUCTION ? APOLLO_KEY : undefined },
      schema,
    })

    apolloServer.applyMiddleware({ cors: CORS_OPTIONS, app: this.app })
    this.logger.info("Apollo setup")
  }
}

new App()
