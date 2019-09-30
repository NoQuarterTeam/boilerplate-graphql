import bcrypt from "bcryptjs"
import { User } from "./user.entity"
import { Service } from "typedi"
import { UserRepository } from "./user.repository"

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(data: { email: string; password: string }): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email)
    if (!user) throw new Error("incorrect email or password")
    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword) throw new Error("incorrect email or password")
    return user
  }

  async create(data: Partial<User> & { email: string }): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email)
    if (userExists) throw new Error("user already exists")
    const user = await User.create(data).save()
    return user
  }

  async update(userId: string, data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(userId)
    Object.assign(user, data)
    await user.save()
    return user
  }
}
