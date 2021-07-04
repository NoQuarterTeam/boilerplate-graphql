import * as React from "react"
import NextLink from "next/link"
import {
  Box,
  Center,
  FlexProps,
  Flex,
  Text,
  Spinner,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react"
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg"
import { useToast } from "lib/hooks/useToast"
import { SortOrder } from "lib/graphql"
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
        <Center p={10} h={400}>
          <Spinner />
        </Center>
      ) : data.length > 0 ? (
        <Flex direction="column" justify="space-between" flexGrow={1}>
          <Box overflowY="scroll">
            {data.map((item) => (
              <Row key={item.id} href={props.getRowHref?.(item)}>
                {columns.map(({ row, sortKey, header, ...column }: ColumnProps<T>, i: number) => (
                  <ColumnField key={i.toString()} isLast={i === columns.length - 1} fontSize="sm" {...column}>
                    {row?.(item)}
                  </ColumnField>
                ))}
              </Row>
            ))}
          </Box>
          <Flex
            py={3}
            px={4}
            align="center"
            justify="space-between"
            borderTop="1px solid"
            borderColor={borderColor}
          >
            <Text w="100%" fontSize="sm">
              {props.count} results
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
  sortKey?: keyof T
  header?: React.ReactNode
}

export function Column<T extends DataType>(_: ColumnProps<T>) {
  return null
}

function _ColumnField({ isLast, ...props }: FlexProps & { isLast?: boolean; children: React.ReactNode }) {
  return (
    <Flex
      flex={1}
      align="center"
      isTruncated
      fontSize="sm"
      justify={isLast ? "flex-end" : "flex-start"}
      overflowX="auto"
      {...props}
    >
      {props.children}
    </Flex>
  )
}

const ColumnField = React.memo(_ColumnField)

interface RowProps {
  children: React.ReactNode
  href?: string
}

function Row(props: RowProps) {
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const bg = useColorModeValue("gray.50", "gray.900")
  return !!props.href ? (
    <NextLink passHref href={props.href}>
      <Link _hover={{ textDecor: "none" }}>
        <Flex
          _hover={{ bg }}
          w="100%"
          px={4}
          h="50px"
          align="center"
          borderTop="1px solid"
          borderColor={borderColor}
        >
          {props.children}
        </Flex>
      </Link>
    </NextLink>
  ) : (
    <Flex w="100%" px={4} h="50px" align="center" borderTop="1px solid" borderColor={borderColor}>
      {props.children}
    </Flex>
  )
}
