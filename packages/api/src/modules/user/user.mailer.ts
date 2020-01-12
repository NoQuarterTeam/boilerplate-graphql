import { Service } from "typedi"
import { FULL_WEB_URL } from "../../lib/config"
import { User } from "./user.entity"
import { Mailer } from "../../lib/mailer"

// In production, SendGrid is used, replace with your own templateIds and
// variables

// In development nodemailer is used and you'll need to setup a smtp server on
// your machine, e.g. mailcatcher, config in /src/lib/config

@Service()
export class UserMailer extends Mailer {
  constructor() {
    super()
  }
  sendWelcomeEmail(user: User) {
    this.send({
      templateId: "d-ba08db2f63594c2a80ae5869cf16f48d",
      to: user.email,
      variables: { firstName: user.firstName },
    })
  }

  sendResetPasswordLink(user: User, token: string) {
    this.send({
      templateId: "d-ef3598195e6c4d5d889e9e45585ed1a2",
      to: user.email,
      variables: {
        link: `${FULL_WEB_URL()}/reset-password?token=${token}`,
      },
    })
  }
}
