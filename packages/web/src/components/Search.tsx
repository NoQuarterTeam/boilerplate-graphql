import * as React from "react"
import { CgClose, CgSearch } from "react-icons/cg"
import { Box, BoxProps, IconButton, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"

import { useForm } from "lib/hooks/useForm"

import { Form } from "./Form"
import { Input } from "./Input"

interface Props extends BoxProps {
  search: string
  onSearch: (search: string) => void
  placeholder?: string
}

export function Search({ onSearch, search, ...props }: Props) {
  const defaultValues = { search: "" }
  const form = useForm({ defaultValues })

  const handleSubmit = (data: typeof defaultValues) => {
    if (!!!search && !!!data.search) return
    onSearch(data.search)
  }

  const clearSearch = () => {
    handleSubmit({ search: "" })
    form.reset({ search: "" })
  }

  const pendingSearch = form.watch("search") as string

  return (
    <Box>
      <Form {...form} onSubmit={handleSubmit}>
        <InputGroup>
          <InputLeftElement w={10}>
            <IconButton
              type="submit"
              size="sm"
              aria-label="search"
              variant="ghost"
              icon={<Box as={CgSearch} />}
            />
          </InputLeftElement>
          <Input
            name="search"
            px={10}
            placeholder={props.placeholder}
            minW={{ base: 200, xl: 300 }}
            {...props}
          />
          <InputRightElement w={10}>
            {(!!pendingSearch || !!search) && (
              <IconButton
                onClick={clearSearch}
                size="sm"
                aria-label="clear search"
                variant="ghost"
                icon={<Box as={CgClose} />}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Form>
    </Box>
  )
}
