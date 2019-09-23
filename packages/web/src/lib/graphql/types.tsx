import gql from "graphql-tag"
import * as ApolloReactCommon from "@apollo/react-common"
import * as ApolloReactHooks from "@apollo/react-hooks"
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  register: User
  login: User
  updateUser?: Maybe<User>
  logout?: Maybe<Scalars["Boolean"]>
  forgotPassword: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
}

export type MutationRegisterArgs = {
  data: RegisterInput
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationUpdateUserArgs = {
  data: UpdateInput
}

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]
}

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput
}

export type Query = {
  __typename?: "Query"
  me?: Maybe<User>
}

export type RegisterInput = {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type ResetPasswordInput = {
  password: Scalars["String"]
  token: Scalars["String"]
}

export type UpdateInput = {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
}
export type UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "email"
>

export type MeQueryVariables = {}

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & UserFragment>
}

export type LoginMutationVariables = {
  data: LoginInput
}

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & UserFragment
}

export type RegisterMutationVariables = {
  data: RegisterInput
}

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & UserFragment
}

export type UpdateUserMutationVariables = {
  data: UpdateInput
}

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser: Maybe<{ __typename?: "User" } & UserFragment>
}

export type LogoutMutationVariables = {}

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>

export type ForgotPasswordMutationVariables = {
  email: Scalars["String"]
}

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>

export type ResetPasswordMutationVariables = {
  data: ResetPasswordInput
}

export type ResetPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "resetPassword"
>
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeQuery,
    MeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}

export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser($data: UpdateInput!) {
    updateUser(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UpdateUserDocument, baseOptions)
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<
  UpdateUserMutation
>
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>

export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions,
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>

export function useForgotPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions)
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<
  ForgotPasswordMutation
>
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>
export const ResetPasswordDocument = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>

export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, baseOptions)
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<
  ResetPasswordMutation
>
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>
