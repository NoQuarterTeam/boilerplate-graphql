# Boilerplate

## Typescript + React + React Native + GraphQL + Prisma

Comes with user authentication included

- [React](https://github.com/facebook/react)
- [React Native](https://github.com/facebook/react-native)
- [Expo](https://www.expo.io)
- [TypeGraphQL](https://github.com/19majkel94/type-graphql)
- [Prisma](https://www.prisma.io)
- Web, App & API monorepo
- Next.js
- TypeScript
- Postgres
- Apollo Client
- Apollo Server
- Express
- React hook form
- Chakra UI
- Customizable theme & Dark mode
- Eslint
- Prettier
- Graphql Code Generator
- Sendgrid SMTP
- Sentry
- Husky
- Lint staged

& many more tasty treats

## Get Started

**Must have node, yarn, postgres and redis installed and setup locally**

Delete whatever packages you don't need for the project, e.g. maybe you dont need the React Native app

1. `yarn install`
2. `createdb boilerplate`
3. `cd packages/api && yarn db:migrate`
4. `cd packages/api && yarn watch`
5. `cd packages/web && yarn dev`
6. `cd packages/app && yarn start`

Make sure you have created a .env file with the right values, use .env.example as the template

We use Husky to run a couple of checks each commit (prettier, eslint & commitlint), make sure to add a
.huskyrc file to your home directory ~/.huskyrc, and add this in:

```bash
export PATH="/usr/local/bin:$PATH"
```

then run

```bash
npx husky install
```

## Production

### Mailers

- Create a Sendgrid account and set a SENDGRID_API_KEY environment variable in .env
- Create templates for each email you want to send and use the templateId in the corresponding mailer class

### Error tracing

- Create a Sentry account + project for each package and add the DSN to the web config and the api env variables

### Deployment

An example is deployed [here](https://boilerplate.noquarter.co)

We are using Heroku for the API package and Vercel for the WEB package

(Our heroku app is on the free tier so there is a warm up time before it becomes responsive)
