import gql from "graphql-tag"
import * as ReactApollo from "react-apollo"
import * as ReactApolloHooks from "react-apollo-hooks"

export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface LoginInput {
  email: Scalars["String"]
  password: Scalars["String"]
}

export interface Mutation {
  register: User
  login: User
  updateUser?: Maybe<User>
  logout: Scalars["Boolean"]
  forgotPassword: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
}

export interface MutationRegisterArgs {
  data: RegisterInput
}

export interface MutationLoginArgs {
  data: LoginInput
}

export interface MutationUpdateUserArgs {
  data: UpdateInput
}

export interface MutationForgotPasswordArgs {
  email: Scalars["String"]
}

export interface MutationResetPasswordArgs {
  data: ResetPasswordInput
}

export interface Query {
  me?: Maybe<User>
}

export interface RegisterInput {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export interface ResetPasswordInput {
  password: Scalars["String"]
  token: Scalars["String"]
}

export interface UpdateInput {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
}

export interface User {
  id: Scalars["ID"]
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
}
export type UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "email"
>

export interface MeQueryVariables {}

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & UserFragment>
}

export interface LoginMutationVariables {
  data: LoginInput
}

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & UserFragment
}

export interface RegisterMutationVariables {
  data: RegisterInput
}

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & UserFragment
}

export interface UpdateUserMutationVariables {
  data: UpdateInput
}

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser: Maybe<{ __typename?: "User" } & UserFragment>
}

export interface LogoutMutationVariables {}

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>

export interface ForgotPasswordMutationVariables {
  email: Scalars["String"]
}

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>

export interface ResetPasswordMutationVariables {
  data: ResetPasswordInput
}

export type ResetPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "resetPassword"
>
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
  }
`
export const MeDocument = gql`
  query Me {
    me {
      ...User
    }
  }
  ${UserFragmentDoc}
`

export function useMeQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeQueryVariables>,
) {
  return ReactApolloHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  )
}
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterMutationVariables
>

export function useRegisterMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions)
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($data: UpdateInput!) {
    updateUser(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export type UpdateUserMutationFn = ReactApollo.MutationFn<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

export function useUpdateUserMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UpdateUserDocument, baseOptions)
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutMutationVariables
>

export function useLogoutMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions,
  )
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`
export type ForgotPasswordMutationFn = ReactApollo.MutationFn<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>

export function useForgotPasswordMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions)
}
export const ResetPasswordDocument = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`
export type ResetPasswordMutationFn = ReactApollo.MutationFn<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>

export function useResetPasswordMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, baseOptions)
}
