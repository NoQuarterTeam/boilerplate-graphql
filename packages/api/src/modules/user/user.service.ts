import { UserInputError } from "apollo-server-express"
import { Service } from "typedi"
import { User, UserWhereInput } from "@generated"

import { createAuthToken } from "../../lib/jwt"
import { prisma } from "../../lib/prisma"
import { LoginInput } from "./inputs/login.input"
import { RegisterInput } from "./inputs/register.input"

@Service()
export class UserService {
  async login(data: LoginInput): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (!user) throw new UserInputError("Incorrect email")
    return user
  }

  async register(data: RegisterInput) {
    const email = data.email.toLowerCase().trim()
    await this.checkUserExists({ email: { equals: email } })
    const user = await prisma.user.create({ data })
    return user
  }

  async checkUserExists(where: UserWhereInput) {
    const user = await prisma.user.findFirst({ where })
    if (user) {
      throw new UserInputError("User with these details already exists")
    }
  }

  createAuthToken(user: User): string {
    return createAuthToken({ id: user.id })
  }
}
