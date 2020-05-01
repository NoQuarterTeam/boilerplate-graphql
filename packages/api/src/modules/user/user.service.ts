import { UserInputError } from "apollo-server-express"
import { Service, Inject } from "typedi"
import bcrypt from "bcryptjs"

import { User } from "./user.entity"

import { UserRepository } from "./user.repository"
import { createAuthToken } from "../../lib/jwt"

@Service()
export class UserService {
  @Inject(() => UserRepository)
  userRepository: UserRepository

  async login(data: { email: string; password: string }): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email)
    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword)
      throw new UserInputError("Incorrect email or password")
    return user
  }

  async create(data: Partial<User>) {
    await this.checkUserExists({ email: data.email })
    const user = await User.create(data).save()
    return user
  }

  async update(userId: string, data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (data.email && user.email !== data.email.toLowerCase().trim()) {
      await this.checkUserExists({ email: data.email })
    }
    return user.update(data)
  }

  async destroy(userId: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId)
    return user.destroy()
  }

  createAuthToken(user: User): string {
    return createAuthToken({ id: user.id })
  }

  async resetPassword(
    userId: string,
    preResetPasswordHash: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.userRepository.findById(userId)
    // the preResetPasswordHash should match, so that the reset link stops working once password changed
    if (preResetPasswordHash && user.password !== preResetPasswordHash) {
      return false
    }
    await this.update(userId, { password: newPassword })
    return true
  }

  async checkUserExists(field: Partial<User>) {
    const user = await User.find({ where: field })
    if (user.length > 0) {
      throw new UserInputError("User with these details already exists")
    }
  }
}
