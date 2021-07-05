# Boilerplate

## Typescript + React + React Native + GraphQL + Prisma

Comes with user authentication included

- [React](https://github.com/facebook/react)
- [React Native](https://github.com/facebook/react-native)
- [Expo](https://www.expo.io)
- [TypeGraphQL](https://github.com/19majkel94/type-graphql)
- [Prisma](https://www.prisma.io)
- Web, Admin, App & API monorepo
- Next.js
- TypeScript
- Postgres
- Apollo Client
- Apollo Server
- Express
- React hook form
- Chakra UI
- Customizable shared theme & Dark mode
- Eslint
- Prettier
- Graphql Code Generator
- Sendgrid SMTP
- Sentry

& many more tasty treats

## Get Started

**Must have node, yarn/npm, postgres and redis installed and setup locally**

Delete whatever packages you don't need for the project, e.g. maybe you dont need the React Native app

1. `git clone https://github.com/NoQuarterTeam/boilerplate.git`
2. `yarn install`
3. `createdb boilerplate` (must have postgres setup locally)
4. `cd packages/api && yarn watch`
5. `cd packages/web && yarn dev`
6. `cd packages/admin && yarn dev`
7. `cd packages/app && yarn start`

Make sure you have created a .env file with the right values, use .env.example as the template

### For mailers

- Create a Sendgrid account and set a SENDGRID_API_KEY environment variable in .env
- Create templates for each email you want to send and use the templateId in the corresponding mailer class

### For error tracing

- Create a Sentry account + project for each package and add the DSN to the web config and the api env variables

### Deployment

An example is deployed [here](https://boilerplate.noquarter.co)

We are using Heroku for the API package and Vercel for the WEB package

(Our heroku app is on the free tier so there is a warm up time before it becomes responsive)
