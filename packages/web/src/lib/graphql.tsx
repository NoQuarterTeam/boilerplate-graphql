/* eslint-disable */
import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
import * as ApolloReactHooks from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string
}

export type AuthResponse = {
  __typename?: "AuthResponse"
  user: User
  token: Scalars["String"]
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["DateTime"]>
}

export type DateTimeFilter = {
  equals?: Maybe<Scalars["DateTime"]>
  in?: Maybe<Array<Scalars["DateTime"]>>
  notIn?: Maybe<Array<Scalars["DateTime"]>>
  lt?: Maybe<Scalars["DateTime"]>
  lte?: Maybe<Scalars["DateTime"]>
  gt?: Maybe<Scalars["DateTime"]>
  gte?: Maybe<Scalars["DateTime"]>
  not?: Maybe<NestedDateTimeFilter>
}

export type EnumRoleFieldUpdateOperationsInput = {
  set?: Maybe<Role>
}

export type EnumRoleFilter = {
  equals?: Maybe<Role>
  in?: Maybe<Array<Role>>
  notIn?: Maybe<Array<Role>>
  not?: Maybe<NestedEnumRoleFilter>
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  updateUser?: Maybe<User>
  login: AuthResponse
  register: AuthResponse
  forgotPassword: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
}

export type MutationUpdateUserArgs = {
  data: UserUpdateInput
  where: UserWhereUniqueInput
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationRegisterArgs = {
  data: RegisterInput
}

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]
}

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput
}

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars["DateTime"]>
  in?: Maybe<Array<Scalars["DateTime"]>>
  notIn?: Maybe<Array<Scalars["DateTime"]>>
  lt?: Maybe<Scalars["DateTime"]>
  lte?: Maybe<Scalars["DateTime"]>
  gt?: Maybe<Scalars["DateTime"]>
  gte?: Maybe<Scalars["DateTime"]>
  not?: Maybe<NestedDateTimeFilter>
}

export type NestedEnumRoleFilter = {
  equals?: Maybe<Role>
  in?: Maybe<Array<Role>>
  notIn?: Maybe<Array<Role>>
  not?: Maybe<NestedEnumRoleFilter>
}

export type NestedStringFilter = {
  equals?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  notIn?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  contains?: Maybe<Scalars["String"]>
  startsWith?: Maybe<Scalars["String"]>
  endsWith?: Maybe<Scalars["String"]>
  not?: Maybe<NestedStringFilter>
}

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  notIn?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  contains?: Maybe<Scalars["String"]>
  startsWith?: Maybe<Scalars["String"]>
  endsWith?: Maybe<Scalars["String"]>
  not?: Maybe<NestedStringNullableFilter>
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["String"]>
}

export type Query = {
  __typename?: "Query"
  user?: Maybe<User>
  users: Array<User>
  me?: Maybe<User>
}

export type QueryUserArgs = {
  where: UserWhereUniqueInput
}

export type QueryUsersArgs = {
  where?: Maybe<UserWhereInput>
  orderBy?: Maybe<Array<UserOrderByInput>>
  cursor?: Maybe<UserWhereUniqueInput>
  take?: Maybe<Scalars["Int"]>
  skip?: Maybe<Scalars["Int"]>
  distinct?: Maybe<Array<UserScalarFieldEnum>>
}

export enum QueryMode {
  Default = "default",
  Insensitive = "insensitive",
}

export type RegisterInput = {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  password: Scalars["String"]
  email: Scalars["String"]
}

export type ResetPasswordInput = {
  password: Scalars["String"]
  token: Scalars["String"]
}

export enum Role {
  User = "USER",
  Admin = "ADMIN",
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["String"]>
}

export type StringFilter = {
  equals?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  notIn?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  contains?: Maybe<Scalars["String"]>
  startsWith?: Maybe<Scalars["String"]>
  endsWith?: Maybe<Scalars["String"]>
  mode?: Maybe<QueryMode>
  not?: Maybe<NestedStringFilter>
}

export type StringNullableFilter = {
  equals?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  notIn?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  contains?: Maybe<Scalars["String"]>
  startsWith?: Maybe<Scalars["String"]>
  endsWith?: Maybe<Scalars["String"]>
  mode?: Maybe<QueryMode>
  not?: Maybe<NestedStringNullableFilter>
}

export type User = {
  __typename?: "User"
  id: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  role: Role
  bio?: Maybe<Scalars["String"]>
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  fullName: Scalars["String"]
}

export type UserOrderByInput = {
  id?: Maybe<SortOrder>
  email?: Maybe<SortOrder>
  password?: Maybe<SortOrder>
  firstName?: Maybe<SortOrder>
  lastName?: Maybe<SortOrder>
  avatar?: Maybe<SortOrder>
  role?: Maybe<SortOrder>
  bio?: Maybe<SortOrder>
  createdAt?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
}

export enum UserScalarFieldEnum {
  Id = "id",
  Email = "email",
  Password = "password",
  FirstName = "firstName",
  LastName = "lastName",
  Avatar = "avatar",
  Role = "role",
  Bio = "bio",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
}

export type UserUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>
  email?: Maybe<StringFieldUpdateOperationsInput>
  password?: Maybe<StringFieldUpdateOperationsInput>
  firstName?: Maybe<NullableStringFieldUpdateOperationsInput>
  lastName?: Maybe<NullableStringFieldUpdateOperationsInput>
  avatar?: Maybe<NullableStringFieldUpdateOperationsInput>
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>
  bio?: Maybe<NullableStringFieldUpdateOperationsInput>
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>
}

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>
  OR?: Maybe<Array<UserWhereInput>>
  NOT?: Maybe<Array<UserWhereInput>>
  id?: Maybe<StringFilter>
  email?: Maybe<StringFilter>
  password?: Maybe<StringFilter>
  firstName?: Maybe<StringNullableFilter>
  lastName?: Maybe<StringNullableFilter>
  avatar?: Maybe<StringNullableFilter>
  role?: Maybe<EnumRoleFilter>
  bio?: Maybe<StringNullableFilter>
  createdAt?: Maybe<DateTimeFilter>
  updatedAt?: Maybe<DateTimeFilter>
}

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
}

export type GetUsersQueryVariables = Exact<{
  orderBy?: Maybe<Array<UserOrderByInput> | UserOrderByInput>
}>

export type GetUsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & Pick<User, "id" | "fullName" | "createdAt">>
}

export type MeFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "fullName" | "email"
>

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: "Query" } & { me?: Maybe<{ __typename?: "User" } & MeFragment> }

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"]
}>

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<Mutation, "forgotPassword">

export type LoginMutationVariables = Exact<{
  data: LoginInput
}>

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type RegisterMutationVariables = Exact<{
  data: RegisterInput
}>

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput
}>

export type ResetPasswordMutation = { __typename?: "Mutation" } & Pick<Mutation, "resetPassword">

export const MeFragmentDoc = gql`
  fragment Me on User {
    id
    firstName
    lastName
    fullName
    email
  }
`
export const GetUsersDocument = gql`
  query GetUsers($orderBy: [UserOrderByInput!]) {
    users(orderBy: $orderBy) {
      id
      fullName
      createdAt
    }
  }
`
export function useGetUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export function useGetUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>
export const MeDocument = gql`
  query Me {
    me {
      ...Me
    }
  }
  ${MeFragmentDoc}
`
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`
export function useForgotPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
    options,
  )
}
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>
export const ResetPasswordDocument = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`
export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    ResetPasswordDocument,
    options,
  )
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>
