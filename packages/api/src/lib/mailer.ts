import sendgridClient from "@sendgrid/client"
import sendgrid from "@sendgrid/mail"
import * as Sentry from "@sentry/node"
import dayjs from "dayjs"
import handlebars from "handlebars"
import nodemailer, { Transporter } from "nodemailer"

import { DEV_EMAIL_OPTIONS, IS_PRODUCTION, SENDGRID_API_KEY } from "./config"

sendgrid.setApiKey(SENDGRID_API_KEY)
sendgridClient.setApiKey(SENDGRID_API_KEY)

interface TemplateVersion {
  updated_at: string
  html_content: string
  plain_content: string
  subject: string
}

interface SendGridResponse {
  versions: TemplateVersion[]
}

interface MailArgs {
  templateId: string
  to: string[] | string
  variables?: any
}

export class Mailer {
  private readonly from: string = "Fullstack boilerplate <info@noquarter.co>"
  private devMail: Transporter

  constructor() {
    this.devMail = nodemailer.createTransport(DEV_EMAIL_OPTIONS)
  }

  async send(args: MailArgs) {
    const data = {
      from: this.from,
      to: args.to,
      templateId: args.templateId,
      dynamic_template_data: args.variables,
    }
    try {
      if (IS_PRODUCTION) {
        await sendgrid.send(data)
      } else {
        this.sendDev(args)
      }
    } catch (err) {
      Sentry.captureException(err)
      console.log("Error sending mail:", err)
    }
  }

  async sendDev(args: MailArgs) {
    const [template] = await sendgridClient.request({
      method: "GET",
      url: `/v3/templates/${args.templateId}`,
    })

    const version = (template.body as SendGridResponse).versions
      .sort((a, b) => dayjs(a.updated_at).unix() - dayjs(b.updated_at).unix())
      .pop()
    if (!version) return
    const htmlSource = handlebars.compile(version.html_content)
    const html = htmlSource(args.variables)

    const textSource = handlebars.compile(version.plain_content)
    const text = textSource(args.variables)

    const subject = args.variables?.subject || version.subject

    this.devMail.sendMail({ to: args.to, from: this.from, subject, html, text })
  }
}
