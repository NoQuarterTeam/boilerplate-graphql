import { getConnectionOptions, createConnection } from "typeorm"
import {
  NODE_ENV,
  DATABASE_URL,
  IS_PRODUCTION,
  IS_STAGING,
} from "../lib/config"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

export const createDbConnection = async () => {
  try {
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
    if (IS_PRODUCTION || IS_STAGING) await connection.runMigrations()
  } catch (err) {
    // Sentry
    console.log(err)
    process.exit(0)
  }
}
