import withApollo from "next-with-apollo"
import ApolloClient, { InMemoryCache } from "apollo-boost"

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: "http://localhost:5000/graphql",
      credentials: "include",
      cache: new InMemoryCache().restore(initialState || {}),
    }) as any,
)
