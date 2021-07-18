import { buildSchema } from "type-graphql"
import { Container } from "typedi"
import { loadResolvers } from "./src/lib/loadResolvers"

export default async () => {
  try {
    await buildSchema({
      container: Container,
      resolvers: loadResolvers(),
      emitSchemaFile: { path: "./schema.graphql" },
    })
  } catch (error) {
    console.log(error)
  }
}
