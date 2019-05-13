import sendgrid from "@sendgrid/mail"
import nodemailer from "nodemailer"
import { SENDGRID_API_KEY, devEmailOptions, isProduction } from "./config"

sendgrid.setApiKey(SENDGRID_API_KEY)

interface DevMailArgs {
  to: string
  subject: string
  html: string
}

export class Mailer {
  private readonly from: string = "Fullstack Team <noreply@fullstack.co>"
  private devMail: any

  constructor() {
    this.devMail = nodemailer.createTransport(devEmailOptions)
  }

  onError(err: any) {
    console.log(err)
    // TODO: Do something with mailer errors
  }

  sendDev(args: DevMailArgs) {
    this.devMail.sendMail({ ...args, from: this.from })
  }

  send(
    templateId: string,
    to: string,
    variables: any,
    devArgs: { subject: string; html: string },
  ) {
    const message = {
      from: this.from,
      to,
      templateId,
      // eslint-disable-next-line
      dynamic_template_data: variables,
    }

    try {
      if (isProduction) {
        sendgrid.send(message)
      } else {
        this.sendDev({ to, ...devArgs })
      }
    } catch (err) {
      this.onError(err)
    }
  }
}
