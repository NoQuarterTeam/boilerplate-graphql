import * as React from "react"
import { Box, Button, Center, Checkbox, Heading, HStack, Spinner, Text } from "@chakra-ui/react"
import Head from "next/head"
import { CgSoftwareDownload, CgUserAdd } from "react-icons/cg"
import { gql } from "@apollo/client"
import dayjs from "dayjs"

import { withAuth } from "@admin/components/hoc/withAuth"
import { Layout } from "@admin/components/Layout"
import { QueryMode, Role, SortOrder, useGetUsersQuery, UserItemFragment } from "@admin/lib/graphql"
import { Column, Table } from "@admin/components/Table"
import { PartialCheckIcon } from "@admin/components/PartialCheckIcon"
import { paginate } from "@admin/lib/apollo/helpers"
import { Search } from "@admin/components/Search"

export const USER_ITEM = gql`
  fragment UserItem on User {
    id
    fullName
    email
    updatedAt
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

const TAKE = 8
function Users() {
  const [search, setSearch] = React.useState("")
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([])

  const { data, loading, fetchMore } = useGetUsersQuery({
    variables: {
      orderBy: { updatedAt: SortOrder.Desc },
      take: TAKE,
      where: {
        role: { equals: Role.User },
        OR: [
          { email: { contains: search, mode: QueryMode.Insensitive } },
          { firstName: { contains: search, mode: QueryMode.Insensitive } },
          { lastName: { contains: search, mode: QueryMode.Insensitive } },
        ],
      },
    },
  })

  const users = data?.users.items

  const handleFetchMore = () => {
    if (!users) return
    return fetchMore({
      variables: { skip: users.length, take: TAKE },
      updateQuery: paginate("users"),
    })
  }

  const toggleSelected = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers((selected) => selected.filter((d) => d !== userId))
    } else {
      setSelectedUsers((selected) => [...selected, userId])
    }
  }
  const toggleAll = () => {
    if (selectedUsers.length > 0) {
      setSelectedUsers([])
    } else if (users) {
      setSelectedUsers(users.map((user) => user.id))
    }
  }

  const isPartialSelection = !!users && selectedUsers.length > 0 && selectedUsers.length < users.length

  return (
    <Layout>
      <Head>
        <title>Users</title>
      </Head>

      <Box>
        <Heading mb={2} fontWeight={800}>
          Users
        </Heading>
        <HStack mb={4}>
          <Search search={search} onSearch={setSearch} placeholder="Search users" />
          <Button leftIcon={<Box boxSize="20px" as={CgSoftwareDownload} />}>Download</Button>
          <Button colorScheme="pink" leftIcon={<Box boxSize="18px" as={CgUserAdd} />}>
            Create user
          </Button>
          {selectedUsers.length > 0 && <Button variant="ghost">{selectedUsers.length} selected</Button>}
        </HStack>
        {loading ? (
          <Center h={300}>
            <Spinner />
          </Center>
        ) : !!!users ? (
          <Center h={300}>
            <Text>Error getting users</Text>
          </Center>
        ) : (
          <Table
            noDataText="No users found"
            data={users}
            take={TAKE}
            onFetchMore={handleFetchMore}
            count={data?.users.count}
            isLoading={loading && !!!data}
          >
            <Column<UserItemFragment>
              maxW="30px"
              header={
                <Checkbox
                  colorScheme="pink"
                  isChecked={data && data.users.count > 0 && selectedUsers.length > 0}
                  onChange={toggleAll}
                  iconColor="black"
                  {...(isPartialSelection && { icon: <PartialCheckIcon /> })}
                />
              }
              row={(user) => (
                <Checkbox
                  colorScheme="pink"
                  isChecked={selectedUsers.includes(user.id)}
                  iconColor="black"
                  onChange={() => toggleSelected(user.id)}
                />
              )}
            />
            <Column<UserItemFragment> header="Name" row={(user) => user.fullName} />
            <Column<UserItemFragment> header="Email" row={(user) => user.email} />
            <Column<UserItemFragment>
              header="Last updated"
              row={(user) => dayjs(user.updatedAt).format("DD/MM/YYYY")}
            />
          </Table>
        )}
      </Box>
    </Layout>
  )
}

export default withAuth(Users)
