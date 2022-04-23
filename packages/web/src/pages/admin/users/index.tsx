import * as React from "react"
import { CgSoftwareDownload, CgUserAdd } from "react-icons/cg"
import { gql } from "@apollo/client"
import { Box, Button, Checkbox, Heading, useDisclosure, Wrap } from "@chakra-ui/react"
import dayjs from "dayjs"
import Head from "next/head"

import type { UserItemFragment } from "lib/graphql"
import { QueryMode, Role, SortOrder, useGetUsersQuery } from "lib/graphql"
import { AdminCreateUserForm } from "components/AdminCreateUserForm"
import { AdminLayout } from "components/AdminLayout"
import { Modal } from "components/Modal"
import { PartialCheckIcon } from "components/PartialCheckIcon"
import { Search } from "components/Search"
import type { Sort } from "components/Table"
import { Column, getOrderBy, Table } from "components/Table"

const _ = gql`
  fragment UserItem on User {
    id
    fullName
    email
    createdAt
  }
`

const __ = gql`
  query GetUsers($orderBy: [UserOrderByWithRelationInput!], $where: UserWhereInput, $skip: Int) {
    users(take: 10, orderBy: $orderBy, where: $where, skip: $skip) {
      items {
        ...UserItem
      }
      count
    }
  }
`

export default function Users() {
  const [search, setSearch] = React.useState("")
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([])
  const modalProps = useDisclosure()
  const [sort, setSort] = React.useState<Sort>({ createdAt: SortOrder.Desc })
  const { data, loading, fetchMore } = useGetUsersQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: getOrderBy(sort),
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
    return fetchMore({ variables: { skip: users.length } })
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
    <Box>
      <Head>
        <title>Users</title>
      </Head>
      <Heading mb={2} fontWeight={800}>
        Users
      </Heading>
      <Wrap mb={4} spacing={2}>
        <Search search={search} onSearch={setSearch} placeholder="Search users" />
        <Button leftIcon={<Box boxSize="20px" as={CgSoftwareDownload} />}>Download</Button>
        <Button
          colorScheme="purple"
          onClick={modalProps.onOpen}
          leftIcon={<Box boxSize="18px" as={CgUserAdd} />}
        >
          Create user
        </Button>
        {selectedUsers.length > 0 && <Button variant="ghost">{selectedUsers.length} selected</Button>}
      </Wrap>

      <Table
        noDataText="No users found"
        data={users}
        count={data?.users.count}
        sort={sort}
        onSort={setSort}
        getRowHref={(user) => `/admin/users/${user.id}`}
        onFetchMore={handleFetchMore}
        isLoading={loading && !!!data}
      >
        <Column<UserItemFragment>
          hasNoLink
          display={{ base: "none", md: "flex" }}
          maxW="30px"
          header={
            <Checkbox
              colorScheme="purple"
              zIndex={100}
              isChecked={data && data.users.count > 0 && selectedUsers.length > 0}
              onChange={toggleAll}
              iconColor="white"
              {...(isPartialSelection && { icon: <PartialCheckIcon color="white" /> })}
            />
          }
          row={(user) => (
            <Checkbox
              colorScheme="purple"
              isChecked={selectedUsers.includes(user.id)}
              iconColor="white"
              onChange={() => toggleSelected(user.id)}
            />
          )}
        />
        <Column<UserItemFragment> sortKey="firstName" header="Name" row={(user) => user.fullName} />
        <Column<UserItemFragment>
          sortKey="email"
          display={{ base: "none", md: "flex" }}
          header="Email"
          row={(user) => user.email}
        />
        <Column<UserItemFragment>
          sortKey="createdAt"
          header="Created"
          row={(user) => dayjs(user.createdAt).format("DD/MM/YYYY")}
        />
      </Table>
      <Modal {...modalProps} title="Create user">
        <AdminCreateUserForm onClose={modalProps.onClose} />
      </Modal>
    </Box>
  )
}

Users.getLayout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>
