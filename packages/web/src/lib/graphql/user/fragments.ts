import gql from "graphql-tag"

export const User = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
  }
`
