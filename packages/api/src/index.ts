import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginCacheControl } from "apollo-server-core"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"
import jwt from "express-jwt"

import { JWT_AUTH } from "./lib/config"
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
      plugins: [ApolloServerPluginCacheControl()],
      schema,
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app: this.app, cors: true })
    this.logger.info("Apollo setup")
  }
}

new App()
