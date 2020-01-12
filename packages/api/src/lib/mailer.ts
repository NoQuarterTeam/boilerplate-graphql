import sendgrid from "@sendgrid/mail"
import sendgridClient from "@sendgrid/client"
import nodemailer, { Transporter } from "nodemailer"

import {
  SENDGRID_API_KEY,
  DEV_EMAIL_OPTIONS,
  IS_PRODUCTION,
  IS_STAGING,
} from "./config"

sendgrid.setApiKey(SENDGRID_API_KEY)
sendgridClient.setApiKey(SENDGRID_API_KEY)

interface MailArgs {
  templateId: string
  to: string | string[]
  variables?: any
}

export class Mailer {
  private readonly from: string = "Boiler Platf <noreply@boilerplate.co>"
  private devMail: Transporter

  constructor() {
    this.devMail = nodemailer.createTransport(DEV_EMAIL_OPTIONS)
  }

  send(args: MailArgs) {
    const data = {
      from: this.from,
      to: args.to,
      templateId: args.templateId,
      dynamic_template_data: args.variables,
    }
    try {
      if (IS_PRODUCTION || IS_STAGING) {
        sendgrid.send(data)
      } else {
        this.sendDev(args)
      }
    } catch (err) {
      // TODO: SENDGRID
      console.log("Error sending mail:", err)
    }
  }

  async sendDev(args: MailArgs) {
    const request = {
      method: "GET",
      url: `/v3/templates/${args.templateId}`,
    }
    const [template] = await sendgridClient.request(request)
    const version = template.body.versions[template.body.versions.length - 1]
    const html = this.interpolateVariables(args.variables, version.html_content)
    const subject = version.subject
    const text = this.interpolateVariables(
      args.variables,
      version.plain_content,
    )
    this.devMail.sendMail({
      to: args.to,
      from: this.from,
      subject,
      html,
      text,
    })
  }

  interpolateVariables(params: any, html: string) {
    let newHtml = html
    if (typeof params === "object") {
      Object.keys(params).forEach(field => {
        const paramKey = `{{ ${field} }}`
        const paramKey2 = `{{${field}}}`
        newHtml = newHtml.replace(new RegExp(paramKey, "g"), params[field])
        newHtml = newHtml.replace(new RegExp(paramKey2, "g"), params[field])
      })
    }
    return newHtml
  }
}
