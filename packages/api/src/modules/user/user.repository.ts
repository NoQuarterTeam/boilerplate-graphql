import { Service } from "typedi"
import { FindOneOptions, FindManyOptions } from "typeorm"
import { UserInputError } from "apollo-server-express"

import { User } from "./user.entity"

@Service()
export class UserRepository {
  async findAll(options?: FindManyOptions<User>) {
    return User.find(options)
  }
  async findById(
    userId: string,
    options?: FindOneOptions<User>,
  ): Promise<User> {
    try {
      const user = await User.findOneOrFail(userId, options)
      return user
    } catch {
      throw new UserInputError("User not found")
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const lowerCaseEmail = email.toLowerCase()
      const user = await User.findOneOrFail({
        where: { email: lowerCaseEmail },
      })
      return user
    } catch {
      throw new UserInputError("User not found")
    }
  }
}
