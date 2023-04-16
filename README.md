# Boilerplate
### Built by [No Quarter](https://www.noquarter.co)

NOTE: We now recommend using our updated [stack](https://github.com/NoQuarterTeam/boilerplate).


<br />

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

<br />

## Feel comfortable with this stack?

We are hiring! [Contact us here](https://www.noquarter.co/#contact)

<br />

## Get Started

**You must have node, yarn, postgres and redis installed and setup locally**

1. Clone the repo
2. Delete the app folder if you're working on a purely web project.

   ```bash
   rm -rf packages/app
   ```

3. Install dependencies.
   ```bash
   yarn install
   ```
4. Create local postgres database
   ```bash
   createdb boilerplate
   ```
5. Create a `.env` file and update the `DATABASE_URL` with your local postgres database url.
   ```bash
   cp packages/api/.env.example  packages/api/.env
   ```
   ```bash
   # Replace <user>,<password> and <db-name> with your corresponding username, password, and database name of your postgresql database.
   DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<db-name>
   ```
6. Migrate the database.
   ```bash
   cd packages/api && yarn db:migrate
   ```

<br />
<br />

We use Husky to run a couple of checks each commit (prettier, eslint & commitlint), make sure to add a
`.huskyrc` file to your home directory:

```bash
touch ~/.huskyrc
```

and copy this into the file this in:

```bash
export PATH="/usr/local/bin:$PATH"
```

then run this in the root of the project:

```bash
npx husky install
```

We use AWS S3 for image/file hosting, so you'll need to set up a few things for this to work, process can be found [here](./docs/setup-s3.md).

<br />
<br />

## Development

1. `cd packages/api && yarn dev`
2. `cd packages/web && yarn dev`
3. `cd packages/app && yarn start`

<br />

### An example of creating a simple todo feature can be found [here](./docs/new-feature.md).

<br />
<br />

## Production

### Mailers

- Create a Sendgrid account and set a SENDGRID_API_KEY environment variable in .env
- Create templates for each email you want to send and use the templateId in the corresponding mailer class

### Error tracing

- Create a Sentry account + project for each package and add the DSN to the web config and the api env variables

### Deployment

An example is deployed [here](https://boilerplate.noquarter.co)

We are using Railway for the API package and Vercel for the WEB package

For railway we have setup preview deploys and that gives a dynamic url that the web can use. The url includes the PR number so on the web we need to grab the PR number from git and dynamically change the API_URL when building the Next.js app. Vercel doesn't include PR numbers in the env variables so we use a package to do that for us.

<br/>
