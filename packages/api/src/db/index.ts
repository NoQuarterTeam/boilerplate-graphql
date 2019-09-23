import { getConnectionOptions, createConnection } from "typeorm"
import { NODE_ENV, DATABASE_URL, isProduction } from "../lib/config"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

export const createDbConnection = async () => {
  // Create DB connection
  const options = (await getConnectionOptions(
    NODE_ENV,
  )) as PostgresConnectionOptions

  const connection = await createConnection({
    ...options,
    name: "default",
    url: DATABASE_URL,
  })

  // Run migrations in production
  if (isProduction) await connection.runMigrations()
}
