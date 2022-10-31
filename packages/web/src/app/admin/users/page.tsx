"use client"
import * as React from "react"
import { CgSoftwareDownload, CgUserAdd } from "react-icons/cg"
import { gql } from "@apollo/client"
import { Box, Button, Checkbox, Heading, HStack, Stack, useDisclosure } from "@chakra-ui/react"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"

import type { UserItemFragment } from "lib/graphql"
import { QueryMode, Role, SortOrder, useGetUsersQuery } from "lib/graphql"
import { Modal } from "components/Modal"
import { PartialCheckIcon } from "components/PartialCheckIcon"
import { Search } from "components/Search"
import type { Sort } from "components/Table"
import { Column, getOrderBy, Table } from "components/Table"
import { Tile } from "components/Tile"

import { AdminCreateUserForm } from "./AdminCreateUserForm"

const TAKE = 10
const _ = gql`
  fragment UserItem on User {
    id
    fullName
    email
    createdAt
  }

  query GetUsers($orderBy: [UserOrderByWithRelationInput!], $where: UserWhereInput, $skip: Int) {
    users(take: 10, orderBy: $orderBy, where: $where, skip: $skip) {
      items {
        ...UserItem
      }
      count
    }
  }
`

export default function Users({ searchParams }: { searchParams: { search?: string; page?: string } }) {
  const { search, page = 0 } = searchParams
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([])
  const modalProps = useDisclosure()
  const [sort, setSort] = React.useState<Sort>({ createdAt: SortOrder.Desc })
  const pageNumber = page ? parseInt(page) : 1

  const { data, loading } = useGetUsersQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: getOrderBy(sort),
      skip: (pageNumber - 1) * TAKE,
      where: {
        role: { equals: Role.User },
        OR: search
          ? [
              { email: { contains: search, mode: QueryMode.Insensitive } },
              { firstName: { contains: search, mode: QueryMode.Insensitive } },
              { lastName: { contains: search, mode: QueryMode.Insensitive } },
            ]
          : undefined,
      },
    },
  })

  const users = data?.users.items

  console.log(users)

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
  const router = useRouter()
  return (
    <Stack>
      <Heading mb={2} fontWeight={800}>
        Users
      </Heading>
      <HStack wrap="wrap" gap={1} spacing={0}>
        <Search
          search={search}
          onSearch={(search) =>
            search ? router.push(`/admin/users?search=${search}`) : router.push("/admin/users")
          }
          placeholder="Search users"
        />
        <Button leftIcon={<Box boxSize="20px" as={CgSoftwareDownload} />}>Download</Button>
        <Button
          colorScheme="purple"
          onClick={modalProps.onOpen}
          leftIcon={<Box boxSize="18px" as={CgUserAdd} />}
        >
          Create user
        </Button>
        {selectedUsers.length > 0 && <Button variant="ghost">{selectedUsers.length} selected</Button>}
      </HStack>

      <Tile>
        <Table
          take={TAKE}
          noDataText="No users found"
          data={users}
          count={data?.users.count}
          sort={sort}
          onSort={setSort}
          getRowHref={(user) => `/admin/users/${user.id}`}
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
      </Tile>

      <Modal {...modalProps} title="Create user">
        <AdminCreateUserForm onClose={modalProps.onClose} />
      </Modal>
    </Stack>
  )
}
