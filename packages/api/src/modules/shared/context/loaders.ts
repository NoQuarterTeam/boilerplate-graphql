import { createParamDecorator } from "type-graphql"

export interface Loaders {
  // Loaders go here
  // userLoader: ReturnType<typeof userLoader>
}

export function Loaders() {
  return createParamDecorator<{ loaders: Loaders }>(async ({ context }) => {
    return context.loaders
  })
}
