import "reflect-metadata"
import "dotenv/config"

import { ApolloServerPluginCacheControl, ApolloServerPluginLandingPageDisabled } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import jwt from "express-jwt"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"

import { JWT_AUTH } from "./lib/config"
import { ExpressContext } from "./lib/express"
import { formatResponse } from "./lib/formatResponse"
import { ErrorInterceptor } from "./lib/globalMiddleware"
import { loadPrismaHooks } from "./lib/hooks"
import { loadCurrentUser } from "./lib/loadCurrentUser"
import { loadResolvers } from "./lib/loadResolvers"
import { prisma } from "./lib/prisma"
import { Server } from "./lib/server"

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
      .use(loadCurrentUser)
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
      plugins: [ApolloServerPluginCacheControl(), ApolloServerPluginLandingPageDisabled()],
      schema,
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app: this.app, cors: true })
    this.logger.info("Apollo setup")
  }
}

new App()
