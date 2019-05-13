import { Service } from "typedi"
import { User } from "./user.entity"

@Service()
export class UserRepository {
  findById(userId: string): Promise<User> {
    return User.findOneOrFail(userId)
  }

  findByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } })
  }
}
