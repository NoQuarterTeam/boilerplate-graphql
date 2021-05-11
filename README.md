# Fullstack Boilerplate

## Typescript + React + Graphql

Comes with user authentication included

- [React](https://github.com/facebook/react)
- [TypeGraphQL](https://github.com/19majkel94/type-graphql)
- [Prisma](https://www.prisma.io)
- Postgres
- TypeScript
- Eslint
- Graphql Code Generator
- Apollo Client
- Apollo Server
- Express
- Customizable Theme
- Dark mode
- React hooks
- Sendgrid SMTP
- Sentry
- Chakra UI
- React hook form
- Lerna Monorepo

& many more tasty treats

## Get Started

**Must have node, yarn/npm, postgres and redis installed and setup locally**

1. `git clone https://github.com/NoQuarterCo/fullstack-boilerplate.git`
2. `yarn install`
3. `createdb fullstack-boilerplate` (must have postgres setup locally)
4. `cd packages/api && yarn watch`
5. `cd packages/web && yarn dev`

### For mailers

- Create a Sendgrid account and set a SENDGRID_API_KEY environment variable in .env
- Create templates for each email you want to send and use the templateId in the corresponding mailer class

### For error tracing

- Create a Sentry account + project for each package and add the DSN to the web config and the api env variables

### Deployment

An example is deployed [here](https://boilerplate.noquarter.co)

We are using Heroku for the API package and Vercel for the WEB package

(Our heroku app is on the free tier so there is a warm up time before it becomes responsive)

