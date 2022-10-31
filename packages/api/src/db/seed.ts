import "reflect-metadata"
import "dotenv/config"

import { faker } from "@faker-js/faker"

import { prisma } from "../lib/prisma"

const createUserData = () =>
  Array.from({ length: 40 }).map(() => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    return {
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName),
      password: faker.internet.password(),
    }
  })

export async function main() {
  await prisma.user.createMany({ data: createUserData() })
}
main()
