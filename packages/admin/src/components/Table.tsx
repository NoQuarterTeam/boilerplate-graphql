import * as React from "react"
import { Box, Center, FlexProps, Flex, Text, Spinner, Button, useColorModeValue } from "@chakra-ui/react"
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti"

import { NoData } from "./NoData"
import { useToast } from "@admin/lib/hooks/useToast"

interface DataType {
  id: string
}

export interface Order {
  order: "ASC" | "DESC"
  orderBy: string
}
interface Props<T extends DataType> {
  isLoading?: boolean
  children:
    | ArrayLike<React.ReactElement<ColumnProps<T>> | undefined>
    | React.ReactElement<ColumnProps<T>>
    | undefined
  count?: number
  data?: T[]
  take?: number
  onFetchMore?: () => Promise<any> | void | undefined
  noDataText?: string
  onSort?: (order: Order) => void
  sort?: Order
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
      <Flex>
        {columns.map(({ sortKey, header, row, ...column }: ColumnProps<T>, i: number) => (
          <Flex
            key={i.toString()}
            flex={1}
            overflow="hidden"
            justifyContent={i === columns.length - 1 ? "flex-end" : "flex-start"}
            {...column}
            align="center"
          >
            {header && (
              <Button
                as={props.sort && props.onSort && sortKey ? "button" : "div"}
                display="flex"
                variant="unstyled"
                alignItems="center"
                minW="auto"
                fontSize="sm"
                h="auto"
                py={3}
                fontWeight={700}
                cursor={props.sort && props.onSort && sortKey ? "pointer" : "default"}
                onClick={() =>
                  props.sort && props.onSort && sortKey
                    ? props.onSort({
                        order: props.sort.order === "DESC" ? "ASC" : "DESC",
                        orderBy: sortKey,
                      })
                    : {}
                }
              >
                {header}
                {props.sort && props.onSort && !!sortKey && (
                  <Flex ml={2} flexDir="column" align="center">
                    <Box
                      as={TiArrowSortedUp}
                      size="16px"
                      m="-4px"
                      color={
                        props.sort.orderBy === sortKey && props.sort.order === "ASC" ? "gray.600" : "gray.400"
                      }
                    />
                    <Box
                      as={TiArrowSortedDown}
                      size="16px"
                      m="-4px"
                      color={
                        props.sort.orderBy === sortKey && props.sort.order === "DESC"
                          ? "gray.600"
                          : "gray.400"
                      }
                    />
                  </Flex>
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
              <Flex key={item.id} w="100%" align="center">
                {columns.map(({ row, sortKey, header, ...column }: ColumnProps<T>, i: number) => (
                  <Row key={i.toString()} isLast={i === columns.length - 1} fontSize="sm" {...column}>
                    {row?.(item)}
                  </Row>
                ))}
              </Flex>
            ))}
          </Box>
          <Flex py={3} align="center" justify="space-between" borderTop="1px solid" borderColor={borderColor}>
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

interface ColumnProps<T> {
  row?: (item: T) => React.ReactNode
  sortKey?: string
  header?: React.ReactNode
}

export function Column<T extends DataType>(_: FlexProps & ColumnProps<T>) {
  return null
}

function _Row({ isLast, ...props }: FlexProps & { isLast?: boolean; children: React.ReactNode }) {
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Flex
      flex={1}
      py={3}
      h="50px"
      align="center"
      isTruncated
      fontSize="sm"
      justify={isLast ? "flex-end" : "flex-start"}
      overflowX="auto"
      borderTop="1px solid"
      borderColor={borderColor}
      {...props}
    >
      {props.children}
    </Flex>
  )
}

const Row = React.memo(_Row)
