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

export type AffectedRowsOutput = {
  __typename?: "AffectedRowsOutput"
  count: Scalars["Int"]
}

export type AggregateUser = {
  __typename?: "AggregateUser"
  _count?: Maybe<UserCountAggregate>
  _min?: Maybe<UserMinAggregate>
  _max?: Maybe<UserMaxAggregate>
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

export type DateTimeWithAggregatesFilter = {
  equals?: Maybe<Scalars["DateTime"]>
  in?: Maybe<Array<Scalars["DateTime"]>>
  notIn?: Maybe<Array<Scalars["DateTime"]>>
  lt?: Maybe<Scalars["DateTime"]>
  lte?: Maybe<Scalars["DateTime"]>
  gt?: Maybe<Scalars["DateTime"]>
  gte?: Maybe<Scalars["DateTime"]>
  not?: Maybe<NestedDateTimeWithAggregatesFilter>
  _count?: Maybe<NestedIntFilter>
  _min?: Maybe<NestedDateTimeFilter>
  _max?: Maybe<NestedDateTimeFilter>
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

export type EnumRoleWithAggregatesFilter = {
  equals?: Maybe<Role>
  in?: Maybe<Array<Role>>
  notIn?: Maybe<Array<Role>>
  not?: Maybe<NestedEnumRoleWithAggregatesFilter>
  _count?: Maybe<NestedIntFilter>
  _min?: Maybe<NestedEnumRoleFilter>
  _max?: Maybe<NestedEnumRoleFilter>
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  createUser: User
  createManyUser: AffectedRowsOutput
  deleteUser?: Maybe<User>
  updateUser?: Maybe<User>
  deleteManyUser: AffectedRowsOutput
  updateManyUser: AffectedRowsOutput
  upsertUser: User
  login: AuthResponse
  loginAdmin: AuthResponse
  register: AuthResponse
  forgotPassword: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
}

export type MutationCreateUserArgs = {
  data: UserCreateInput
}

export type MutationCreateManyUserArgs = {
  data: Array<UserCreateManyInput>
  skipDuplicates?: Maybe<Scalars["Boolean"]>
}

export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput
}

export type MutationUpdateUserArgs = {
  data: UserUpdateInput
  where: UserWhereUniqueInput
}

export type MutationDeleteManyUserArgs = {
  where?: Maybe<UserWhereInput>
}

export type MutationUpdateManyUserArgs = {
  data: UserUpdateManyMutationInput
  where?: Maybe<UserWhereInput>
}

export type MutationUpsertUserArgs = {
  where: UserWhereUniqueInput
  create: UserCreateInput
  update: UserUpdateInput
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

export type NestedDateTimeWithAggregatesFilter = {
  equals?: Maybe<Scalars["DateTime"]>
  in?: Maybe<Array<Scalars["DateTime"]>>
  notIn?: Maybe<Array<Scalars["DateTime"]>>
  lt?: Maybe<Scalars["DateTime"]>
  lte?: Maybe<Scalars["DateTime"]>
  gt?: Maybe<Scalars["DateTime"]>
  gte?: Maybe<Scalars["DateTime"]>
  not?: Maybe<NestedDateTimeWithAggregatesFilter>
  _count?: Maybe<NestedIntFilter>
  _min?: Maybe<NestedDateTimeFilter>
  _max?: Maybe<NestedDateTimeFilter>
}

export type NestedEnumRoleFilter = {
  equals?: Maybe<Role>
  in?: Maybe<Array<Role>>
  notIn?: Maybe<Array<Role>>
  not?: Maybe<NestedEnumRoleFilter>
}

export type NestedEnumRoleWithAggregatesFilter = {
  equals?: Maybe<Role>
  in?: Maybe<Array<Role>>
  notIn?: Maybe<Array<Role>>
  not?: Maybe<NestedEnumRoleWithAggregatesFilter>
  _count?: Maybe<NestedIntFilter>
  _min?: Maybe<NestedEnumRoleFilter>
  _max?: Maybe<NestedEnumRoleFilter>
}

export type NestedIntFilter = {
  equals?: Maybe<Scalars["Int"]>
  in?: Maybe<Array<Scalars["Int"]>>
  notIn?: Maybe<Array<Scalars["Int"]>>
  lt?: Maybe<Scalars["Int"]>
  lte?: Maybe<Scalars["Int"]>
  gt?: Maybe<Scalars["Int"]>
  gte?: Maybe<Scalars["Int"]>
  not?: Maybe<NestedIntFilter>
}

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars["Int"]>
  in?: Maybe<Array<Scalars["Int"]>>
  notIn?: Maybe<Array<Scalars["Int"]>>
  lt?: Maybe<Scalars["Int"]>
  lte?: Maybe<Scalars["Int"]>
  gt?: Maybe<Scalars["Int"]>
  gte?: Maybe<Scalars["Int"]>
  not?: Maybe<NestedIntNullableFilter>
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

export type NestedStringNullableWithAggregatesFilter = {
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
  not?: Maybe<NestedStringNullableWithAggregatesFilter>
  _count?: Maybe<NestedIntNullableFilter>
  _min?: Maybe<NestedStringNullableFilter>
  _max?: Maybe<NestedStringNullableFilter>
}

export type NestedStringWithAggregatesFilter = {
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
  not?: Maybe<NestedStringWithAggregatesFilter>
  _count?: Maybe<NestedIntFilter>
  _min?: Maybe<NestedStringFilter>
  _max?: Maybe<NestedStringFilter>
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["String"]>
}

export type Query = {
  __typename?: "Query"
  user?: Maybe<User>
  findFirstUser?: Maybe<User>
  users: UsersResponse
  aggregateUser: AggregateUser
  groupByUser: Array<UserGroupBy>
  me?: Maybe<User>
}

export type QueryUserArgs = {
  where: UserWhereUniqueInput
}

export type QueryFindFirstUserArgs = {
  where?: Maybe<UserWhereInput>
  orderBy?: Maybe<Array<UserOrderByInput>>
  cursor?: Maybe<UserWhereUniqueInput>
  take?: Maybe<Scalars["Int"]>
  skip?: Maybe<Scalars["Int"]>
  distinct?: Maybe<Array<UserScalarFieldEnum>>
}

export type QueryUsersArgs = {
  where?: Maybe<UserWhereInput>
  orderBy?: Maybe<Array<UserOrderByInput>>
  cursor?: Maybe<UserWhereUniqueInput>
  take?: Maybe<Scalars["Int"]>
  skip?: Maybe<Scalars["Int"]>
  distinct?: Maybe<Array<UserScalarFieldEnum>>
}

export type QueryAggregateUserArgs = {
  where?: Maybe<UserWhereInput>
  orderBy?: Maybe<Array<UserOrderByInput>>
  cursor?: Maybe<UserWhereUniqueInput>
  take?: Maybe<Scalars["Int"]>
  skip?: Maybe<Scalars["Int"]>
}

export type QueryGroupByUserArgs = {
  where?: Maybe<UserWhereInput>
  orderBy?: Maybe<Array<UserOrderByInput>>
  by: Array<UserScalarFieldEnum>
  having?: Maybe<UserScalarWhereWithAggregatesInput>
  take?: Maybe<Scalars["Int"]>
  skip?: Maybe<Scalars["Int"]>
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

export type StringNullableWithAggregatesFilter = {
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
  not?: Maybe<NestedStringNullableWithAggregatesFilter>
  _count?: Maybe<NestedIntNullableFilter>
  _min?: Maybe<NestedStringNullableFilter>
  _max?: Maybe<NestedStringNullableFilter>
}

export type StringWithAggregatesFilter = {
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
  not?: Maybe<NestedStringWithAggregatesFilter>
  _count?: Maybe<NestedIntFilter>
  _min?: Maybe<NestedStringFilter>
  _max?: Maybe<NestedStringFilter>
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

export type UserCountAggregate = {
  __typename?: "UserCountAggregate"
  id: Scalars["Int"]
  email: Scalars["Int"]
  password: Scalars["Int"]
  firstName: Scalars["Int"]
  lastName: Scalars["Int"]
  avatar: Scalars["Int"]
  role: Scalars["Int"]
  bio: Scalars["Int"]
  createdAt: Scalars["Int"]
  updatedAt: Scalars["Int"]
  _all: Scalars["Int"]
}

export type UserCreateInput = {
  id?: Maybe<Scalars["String"]>
  email: Scalars["String"]
  password: Scalars["String"]
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  role?: Maybe<Role>
  bio?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type UserCreateManyInput = {
  id?: Maybe<Scalars["String"]>
  email: Scalars["String"]
  password: Scalars["String"]
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  role?: Maybe<Role>
  bio?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type UserGroupBy = {
  __typename?: "UserGroupBy"
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
  _count?: Maybe<UserCountAggregate>
  _min?: Maybe<UserMinAggregate>
  _max?: Maybe<UserMaxAggregate>
}

export type UserMaxAggregate = {
  __typename?: "UserMaxAggregate"
  id?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  role?: Maybe<Role>
  bio?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type UserMinAggregate = {
  __typename?: "UserMinAggregate"
  id?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  role?: Maybe<Role>
  bio?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
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

export type UserScalarWhereWithAggregatesInput = {
  AND?: Maybe<Array<UserScalarWhereWithAggregatesInput>>
  OR?: Maybe<Array<UserScalarWhereWithAggregatesInput>>
  NOT?: Maybe<Array<UserScalarWhereWithAggregatesInput>>
  id?: Maybe<StringWithAggregatesFilter>
  email?: Maybe<StringWithAggregatesFilter>
  password?: Maybe<StringWithAggregatesFilter>
  firstName?: Maybe<StringNullableWithAggregatesFilter>
  lastName?: Maybe<StringNullableWithAggregatesFilter>
  avatar?: Maybe<StringNullableWithAggregatesFilter>
  role?: Maybe<EnumRoleWithAggregatesFilter>
  bio?: Maybe<StringNullableWithAggregatesFilter>
  createdAt?: Maybe<DateTimeWithAggregatesFilter>
  updatedAt?: Maybe<DateTimeWithAggregatesFilter>
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

export type UserUpdateManyMutationInput = {
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

export type UsersResponse = {
  __typename?: "UsersResponse"
  count: Scalars["Int"]
  items: Array<User>
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
  loginAdmin: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput
}>

export type ResetPasswordMutation = { __typename?: "Mutation" } & Pick<Mutation, "resetPassword">

export type UserItemFragment = { __typename?: "User" } & Pick<User, "id" | "fullName" | "email" | "updatedAt">

export type GetUsersQueryVariables = Exact<{
  take?: Maybe<Scalars["Int"]>
  orderBy?: Maybe<Array<UserOrderByInput> | UserOrderByInput>
  where?: Maybe<UserWhereInput>
  skip?: Maybe<Scalars["Int"]>
}>

export type GetUsersQuery = { __typename?: "Query" } & {
  users: { __typename?: "UsersResponse" } & Pick<UsersResponse, "count"> & {
      items: Array<{ __typename?: "User" } & UserItemFragment>
    }
}

export const MeFragmentDoc = gql`
  fragment Me on User {
    id
    firstName
    lastName
    fullName
    email
  }
`
export const UserItemFragmentDoc = gql`
  fragment UserItem on User {
    id
    fullName
    email
    updatedAt
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
    loginAdmin(data: $data) {
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
export const GetUsersDocument = gql`
  query GetUsers($take: Int, $orderBy: [UserOrderByInput!], $where: UserWhereInput, $skip: Int) {
    users(take: $take, orderBy: $orderBy, where: $where, skip: $skip) {
      items {
        ...UserItem
      }
      count
    }
  }
  ${UserItemFragmentDoc}
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
