import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Center, Flex, HStack, Input, Text } from "@chakra-ui/react"
import dayjs from "dayjs"

import { QueryMode, SortOrder, useGetUsersQuery, UserItemFragment } from "lib/graphql"
import { paginate } from "lib/apollo/helpers"
import { Column, Sort, Table } from "components/Table"
import { withAuth } from "components/hoc/withAuth"

export const USER_FRAG = gql`
  fragment UserItem on User {
    id
    firstName
    lastName
    createdAt
  }
`

export const GET_USERS = gql`
  query GetUsers($take: Int, $orderBy: [UserOrderByInput!], $where: UserWhereInput, $skip: Int) {
    users(take: $take, orderBy: $orderBy, where: $where, skip: $skip) {
      items {
        ...UserItem
      }
      count
    }
  }
`

const TAKE = 10
function Users() {
  const [search, setSearch] = React.useState("")
  const [sort, setSort] = React.useState<Sort>({ createdAt: SortOrder.Desc })

  const { data, error, loading, fetchMore } = useGetUsersQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: sort,
      take: TAKE,
      where: {
        OR: [
          { firstName: { contains: search, mode: QueryMode.Insensitive } },
          { lastName: { contains: search, mode: QueryMode.Insensitive } },
        ],
      },
    },
  })

  const users = data?.users.items
  const handleFetchMore = () => {
    if (!users) return
    return fetchMore({ variables: { skip: users.length, take: TAKE }, updateQuery: paginate("users") })
  }

  return (
    <Box p={10}>
      <Flex mb={6} align="center" justify="space-between">
        <HStack>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users"
            minW={{ base: 200, xl: 300 }}
          />
        </HStack>
      </Flex>
      {error ? (
        <Center h={300}>
          <Text>Error fetching users</Text>
        </Center>
      ) : (
        <Table
          noDataText="No users found"
          data={users}
          take={TAKE}
          sort={sort}
          onSort={setSort}
          onFetchMore={handleFetchMore}
          count={data?.users.count}
          isLoading={loading && !!!data}
        >
          <Column<UserItemFragment> sortKey="firstName" header="First name" row={(user) => user.firstName} />
          <Column<UserItemFragment> sortKey="lastName" header="Last name" row={(user) => user.lastName} />
          <Column<UserItemFragment>
            sortKey="createdAt"
            header="Signed up"
            row={(user) => dayjs(user.createdAt).format("DD/MM/YYYY")}
          />
        </Table>
      )}
    </Box>
  )
}

export default withAuth(Users)
