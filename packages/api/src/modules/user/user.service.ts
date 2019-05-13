import bcrypt from "bcryptjs"
import { User } from "./user.entity"
import { LoginInput, RegisterInput, UpdateInput } from "./user.input"
import { Service } from "typedi"
import { UserRepository } from "./user.repository"

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  login(data: LoginInput): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findByEmail(data.email)
        if (!user) throw new Error("incorrect email or password")
        const isValidPassword = await bcrypt.compare(
          data.password,
          user.password,
        )
        if (!isValidPassword) throw new Error("incorrect email or password")

        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(data: RegisterInput): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const userExists = await this.userRepository.findByEmail(data.email)
        if (userExists) throw new Error("user already exists")
        const user = await User.create(data).save()
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(userId: string, data: UpdateInput): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findById(userId)
        Object.assign(user, data)
        await user.save()
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }
}
