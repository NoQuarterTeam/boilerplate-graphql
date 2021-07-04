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
  login: AuthResponse
  loginAdmin: AuthResponse
  register: AuthResponse
  forgotPassword: Scalars["Boolean"]
  destroyAccount: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationLoginAdminArgs = {
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

export type Query = {
  __typename?: "Query"
  users: UsersResponse
  me?: Maybe<User>
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

export type UsersResponse = {
  __typename?: "UsersResponse"
  count: Scalars["Int"]
  items: Array<User>
}

export type MeFragment = { __typename?: "User" } & Pick<User, "id" | "firstName" | "lastName" | "email">

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: "Query" } & { me?: Maybe<{ __typename?: "User" } & MeFragment> }

export type LoginMutationVariables = Exact<{
  data: LoginInput
}>

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export const MeFragmentDoc = gql`
  fragment Me on User {
    id
    firstName
    lastName
    email
  }
`
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
