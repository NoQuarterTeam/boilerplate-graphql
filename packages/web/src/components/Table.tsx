import * as React from "react"
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg"
import {
  Box,
  Button,
  Center,
  Flex,
  FlexProps,
  Link,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import NextLink from "next/link"

import { SortOrder } from "lib/graphql"
import { useToast } from "lib/hooks/useToast"

import { NoData } from "./NoData"

interface DataType {
  id: string
}

export type Sort = { [key: string]: SortOrder.Desc | SortOrder.Asc }

interface Props<T extends DataType> {
  isLoading: boolean
  children:
    | ArrayLike<React.ReactElement<ColumnProps<T>> | undefined>
    | React.ReactElement<ColumnProps<T>>
    | undefined
  count?: number
  data?: T[]
  take?: number
  getRowHref?: (item: T) => string
  onFetchMore?: () => Promise<any> | void | undefined
  noDataText?: string
  onSort?: (sort: Sort) => void
  sort?: Sort
}

export function Table<T extends DataType>(props: Props<T>) {
  const borderColor = useColorModeValue("gray.200", "gray.700")

  const maybeColumns: (ColumnProps<T> | undefined)[] = React.Children.map<
    ColumnProps<T>,
    React.ReactElement<ColumnProps<T>>
  >(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    props.children,
    (child) => child?.props,
  )
  const toast = useToast()

  const [fetchLoading, setFetchLoading] = React.useState(false)
  const handleFetchMore = async () => {
    if (!props.onFetchMore) return
    try {
      setFetchLoading(true)
      await props.onFetchMore()
    } catch {
      toast({ status: "error", description: "Error fetching more" })
    } finally {
      setFetchLoading(false)
    }
  }
  const columns = maybeColumns.filter(Boolean)
  const data = props.data || []

  return (
    <Flex flexGrow={1} direction="column" overflow="hidden">
      <Flex px={4} py={3}>
        {columns.map(({ sortKey, header, row, ...column }: ColumnProps<T>, i: number) => (
          <Flex
            key={i.toString()}
            flex={1}
            overflow="hidden"
            justifyContent={i === columns.length - 1 ? "flex-end" : "flex-start"}
            align="center"
            {...column}
          >
            {header && row && (
              <Button
                as={props.sort && props.onSort && sortKey ? "button" : "div"}
                display="flex"
                variant="unstyled"
                alignItems="center"
                minW="auto"
                fontSize="sm"
                h="auto"
                fontWeight={700}
                cursor={props.sort && props.onSort && sortKey ? "pointer" : "default"}
                onClick={() =>
                  props.sort && props.onSort && sortKey
                    ? props.onSort({
                        [sortKey]:
                          props.sort[sortKey as string] === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
                      })
                    : {}
                }
              >
                {header}
                {props.sort && props.onSort && !!sortKey && (
                  <Center ml={2}>
                    {props.sort[sortKey as string] && props.sort[sortKey as string] === SortOrder.Asc ? (
                      <Box as={CgArrowLongUp} size="16px" m="-4px" />
                    ) : props.sort[sortKey as string] && props.sort[sortKey as string] === SortOrder.Desc ? (
                      <Box as={CgArrowLongDown} size="16px" m="-4px" />
                    ) : null}
                  </Center>
                )}
              </Button>
            )}
          </Flex>
        ))}
      </Flex>

      {props.isLoading ? (
        <Center p={10} h={100}>
          <Spinner />
        </Center>
      ) : data.length > 0 ? (
        <Flex direction="column" justify="space-between" flexGrow={1}>
          {data.map((item) => (
            <Row key={item.id} hasHref={!!props.getRowHref}>
              {columns.map(({ row, sortKey, header, ...column }: ColumnProps<T>, i: number) => (
                <ColumnField
                  key={i.toString()}
                  href={props.getRowHref?.(item)}
                  isLast={i === columns.length - 1}
                  {...column}
                >
                  {row?.(item)}
                </ColumnField>
              ))}
            </Row>
          ))}
          <Flex
            py={3}
            px={4}
            align="center"
            justify="space-between"
            borderTop="1px solid"
            borderColor={borderColor}
          >
            <Text w="100%" fontSize="sm">
              {props.data?.length} / {props.count}
            </Text>

            {!!props.onFetchMore &&
              !!props.count &&
              props.count > (props.take || 20) &&
              props.data?.length !== props.count && (
                <Button size="sm" onClick={handleFetchMore} isLoading={fetchLoading}>
                  Show more
                </Button>
              )}
          </Flex>
        </Flex>
      ) : (
        <Center p={10}>
          <NoData>{props.noDataText || "No data yet"}</NoData>
        </Center>
      )}
    </Flex>
  )
}

interface ColumnProps<T> extends FlexProps {
  row?: (item: T) => React.ReactNode
  sortKey?: string
  hasNoLink?: boolean
  header?: React.ReactNode
}

export function Column<T extends DataType>(_: ColumnProps<T>) {
  return null
}

function _ColumnField<T>({
  isLast,
  hasNoLink,
  href,
  ...props
}: ColumnProps<T> & { href?: string; isLast?: boolean }) {
  const sharedProps: FlexProps = {
    flex: 1,
    align: "center",
    h: "50px",
    isTruncated: true,
    fontSize: "sm",
    justify: isLast ? "flex-end" : "flex-start",
    overflowX: "auto",
    ...props,
  }
  return !!!hasNoLink && !!href ? (
    <NextLink passHref href={href}>
      <Flex as={Link} _hover={{ textDecor: "none" }} {...sharedProps}>
        {props.children}
      </Flex>
    </NextLink>
  ) : (
    <Flex {...sharedProps}>{props.children}</Flex>
  )
}

const ColumnField = React.memo(_ColumnField)

interface RowProps {
  children: React.ReactNode
  hasHref?: boolean
}

function Row(props: RowProps) {
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const bg = useColorModeValue("gray.50", "gray.900")
  return (
    <Flex
      w="100%"
      {...(props.hasHref && { cursor: "pointer", _hover: { bg } })}
      px={4}
      align="center"
      borderTop="1px solid"
      borderColor={borderColor}
    >
      {props.children}
    </Flex>
  )
}

// Sometimes we have table thats using nested data, and so the sortKey needs to be nested
// e.g { user: { createdAt: "desc" } }, instead of just { createdAt: "desc" }
// so this function allows us to pass "user.createdAt" as the sortKey
// and it converts it to the nested structure, pretty sweet right?

export function getOrderBy(sort: Sort) {
  const key = Object.keys(sort)[0]
  const value = sort[key]
  let object = {} as any
  const result = object
  const arr = key.split(".")
  for (let i = 0; i < arr.length - 1; i++) {
    object = object[arr[i]] = {}
  }
  object[arr[arr.length - 1]] = value
  return result
}
