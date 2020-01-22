import sendgrid from "@sendgrid/mail"
import sendgridClient from "@sendgrid/client"
import nodemailer, { Transporter } from "nodemailer"

import {
  SENDGRID_API_KEY,
  DEV_EMAIL_OPTIONS,
  IS_PRODUCTION,
  IS_STAGING,
} from "./config"

// In production, SendGrid is used, replace with your own templateIds and
// variables
//
// In development nodemailer is used as the email server, you'll need to setup
// a smtp server on your machine, e.g. mailcatcher / mailhog
// config in /src/lib/config
//
// A request is made to Sendgrid to get the HTML for the provided template,
// and the variables are injected in and the final html is sent using nodemailer
// this allows rapid development whilst only having to keep one email template
// up to date

sendgrid.setApiKey(SENDGRID_API_KEY)
sendgridClient.setApiKey(SENDGRID_API_KEY)
const devMail: Transporter = nodemailer.createTransport(DEV_EMAIL_OPTIONS)

interface MailArgs {
  templateId: string
  to: string | string[]
  variables?: any
}

export class Mailer {
  private readonly from: string = "Boiler Plate <noreply@boilerplate.co>"
  send(args: MailArgs) {
    if (!SENDGRID_API_KEY) return
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
    devMail.sendMail({
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
