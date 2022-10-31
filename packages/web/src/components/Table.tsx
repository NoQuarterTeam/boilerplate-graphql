import * as React from "react"
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import type { FlexProps } from "@chakra-ui/react"
import { HStack, IconButton } from "@chakra-ui/react"
import { Box, Button, Center, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import type { SortOrderInput } from "lib/graphql"
import { NullsOrder, SortOrder } from "lib/graphql"

import { NoData } from "./NoData"

interface DataType {
  id: string
}

export type Sort = { [key: string]: SortOrder } | { [key: string]: { sort: SortOrder; nulls: NullsOrder } }

export interface TableProps<T extends DataType> {
  isLoading: boolean
  children:
    | ArrayLike<React.ReactElement<ColumnProps<T>> | undefined>
    | React.ReactElement<ColumnProps<T>>
    | undefined
  count?: number
  take: number
  data?: T[]
  getRowHref?: (item: T) => string
  noDataText?: string
  onSort?: (sort: Sort) => void
  sort?: Sort
}

export function Table<T extends DataType>(props: TableProps<T>) {
  const params = useSearchParams()
  const pathname = usePathname()
  const pageNumber = params.get("page") || "1"
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const router = useRouter()
  const currentPage = parseInt(pageNumber as string)
  const maybeColumns: (ColumnProps<T> | undefined)[] = React.Children.map<
    ColumnProps<T>,
    React.ReactElement<ColumnProps<T>>
  >(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    props.children,
    (child) => child?.props,
  )

  const columns = maybeColumns.filter(Boolean)
  const data = props.data || []

  return (
    <Flex flexGrow={1} direction="column" overflow="hidden">
      <Flex px={4} py={3}>
        {columns.map(({ sortKey, header, row, hasNoLink, ...column }: ColumnProps<T>, i: number) => (
          <Flex
            key={i.toString()}
            flex={1}
            pl={i === 0 ? 0 : 2}
            overflow="hidden"
            justifyContent={i === columns.length - 1 ? "flex-end" : "flex-start"}
            align="center"
            {...column}
          >
            {header && row && (
              <Button
                as={props.sort && props.onSort && sortKey ? "button" : "div"}
                display="flex"
                _hover={{ opacity: props.sort && props.onSort && sortKey ? 0.6 : undefined }}
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

      {props.isLoading && !!!props.data ? (
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
                  pl={i === 0 ? 0 : 2}
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
              Total - {props.count}
            </Text>
            <Box>
              <Pagination
                currentPage={currentPage}
                siblingCount={1}
                onPageChange={(page) => router.push(`${pathname}?page=${page}`)}
                totalCount={props.count || 0}
                pageSize={props.take}
              />
            </Box>
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

export interface ColumnProps<T> extends FlexProps {
  row?: (item: T) => React.ReactNode
  sortKey?: string
  hasNoLink?: boolean
  header?: React.ReactNode
}

export function Column<T extends DataType>(_: ColumnProps<T>) {
  return null
}

export function _ColumnField<T>({
  isLast,
  hasNoLink,
  href,
  ...props
}: ColumnProps<T> & { href?: string; isLast?: boolean }) {
  const sharedProps: FlexProps = {
    flex: 1,
    align: "center",
    h: "50px",
    fontSize: "sm",
    justify: isLast ? "flex-end" : "flex-start",
    overflowX: "auto",
    ...props,
  }
  return !!!hasNoLink && !!href ? (
    <Flex
      as={NextLink}
      href={href}
      _hover={{ textDecor: "none" }}
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      {...sharedProps}
    >
      {typeof props.children === "string" || typeof props.children === "number" ? (
        <Text noOfLines={1}>{props.children}</Text>
      ) : (
        props.children
      )}
    </Flex>
  ) : (
    <Flex {...sharedProps} sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
      {typeof props.children === "string" || typeof props.children === "number" ? (
        <Text noOfLines={1}>{props.children}</Text>
      ) : (
        props.children
      )}
    </Flex>
  )
}

export const ColumnField = React.memo(_ColumnField)

export interface RowProps {
  children: React.ReactNode
  hasHref?: boolean
}

export function Row(props: RowProps) {
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

// Due to prisma now allowing us to sort things where if the value is null we put it at the end, there is a
// new syntax, where if the field on the model is nullable, we append a ? to the sortKey prop and it will sort
// the records where the null records are at the end

// Example:
// sortKey="planEndDate?"

export function getOrderBy(sort: Sort): { [key: string]: SortOrder | SortOrderInput } {
  const key = Object.keys(sort)[0]
  const value = sort[key]
  const parsedKey = key.replace("?", "")
  let object = {} as any
  const result = object
  const arr = parsedKey.split(".")
  for (let i = 0; i < arr.length - 1; i++) {
    object = object[arr[i]] = {} as any
  }
  object[arr[arr.length - 1]] = key.includes("?") ? { sort: value, nulls: NullsOrder.Last } : value
  return result
}

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export const DOTS = -1

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: {
  totalCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
}) => {
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const totalPageNumbers = siblingCount + 5
    if (totalPageNumbers >= totalPageCount) return range(1, totalPageCount)

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, DOTS, totalPageCount]
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [firstPageIndex, DOTS, ...rightRange]
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
    return []
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}

interface PaginationProps {
  onPageChange: (page: number) => void
  totalCount: number
  pageSize: number
  currentPage: number
  siblingCount: number
}

function Pagination(props: PaginationProps) {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props

  const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize })

  if (!currentPage || currentPage === 0 || paginationRange.length < 2) return null

  const onNext = () => onPageChange(currentPage + 1)
  const onPrevious = () => onPageChange(currentPage - 1)

  const lastPage = paginationRange[paginationRange.length - 1]
  return (
    <HStack spacing={1}>
      <IconButton
        size="xs"
        isDisabled={currentPage === 1}
        onClick={onPrevious}
        icon={<Box as={ChevronLeftIcon} />}
        aria-label="previous page"
      />

      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) return <Box>&#8230;</Box>
        return (
          <Button
            fontWeight={pageNumber === currentPage ? "bold" : "normal"}
            size="xs"
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        )
      })}
      <IconButton
        isDisabled={currentPage === lastPage}
        size="xs"
        onClick={onNext}
        icon={<Box as={ChevronRightIcon} />}
        aria-label="next page"
      />
    </HStack>
  )
}
