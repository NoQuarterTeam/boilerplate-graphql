import { Service } from "typedi"
import { FULL_WEB_URL } from "../../lib/config"
import { User } from "./user.entity"
import { Mailer } from "../../lib/mailer"

@Service()
export class UserMailer extends Mailer {
  sendWelcomeEmail(user: User) {
    this.send({
      templateId: "d-sendgrid-template-id",
      to: user.email,
      variables: { firstName: user.firstName },
    })
  }

  sendResetPasswordLink(user: User, token: string) {
    this.send({
      templateId: "d-sendgrid-template-id2",
      to: user.email,
      variables: {
        link: `${FULL_WEB_URL()}/reset-password?token=${token}`,
      },
    })
  }
}
