import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import express, { Response } from "express"
import jwt from "express-jwt"
import morgan from "morgan"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"

import { createDbConnection } from "./db"
import { authChecker } from "./lib/authChecker"

import { cors, PORT, resolverPaths, APP_SECRET } from "./lib/config"
import { AppRequest } from "./lib/types"

async function main() {
  try {
    await createDbConnection()

    const app = express()
      .use(morgan("dev"))
      .use(
        jwt({
          secret: APP_SECRET,
          credentialsRequired: false,
        }),
      )
      .use((err: any, _: any, __: any, next: any) => {
        if (err.name === "UnauthorizedError") next()
      })

    const schema = await buildSchema({
      authChecker,
      authMode: "null",
      container: Container,
      resolvers: [__dirname + resolverPaths],
    })

    const apolloServer = new ApolloServer({
      context: ({ req, res }: { req: AppRequest; res: Response }) => ({
        req,
        res,
        userId: req.user && req.user.id,
      }),
      introspection: true,
      playground: true,
      schema,
    })

    apolloServer.applyMiddleware({
      app,
      cors,
    })

    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT} 🚀`),
    )
  } catch (error) {
    console.log(error)
  }
}

main()
