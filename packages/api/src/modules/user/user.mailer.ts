import { Service } from "typedi"
import { webUrl } from "../../lib/config"
import { User } from "./user.entity"
import { Mailer } from "../../lib/mailer"

@Service()
export class UserMailer {
  constructor(private readonly mailer: Mailer) {}

  async sendResetPasswordLink(user: User, token: string) {
    this.mailer.send(
      "d-4ec041a37a484a0b84b84efa333acfa5",
      user.email,
      {
        buttonUrl: `${webUrl}/reset-password/${token}`,
      },
      {
        subject: "Reset password link",
        html: `click <a href="${webUrl}/reset-password/${token}">here</a> to reset your password`,
      },
    )
  }

  async sendWelcomeEmail(user: User) {
    this.mailer.send(
      "d-fcd2fc1f27e74fccaff1fcb3943dec51",
      user.email,
      {
        userFirstName: user.firstName,
      },
      {
        subject: "Welcome",
        html: `Welcome to the boilerplate`,
      },
    )
  }
}
