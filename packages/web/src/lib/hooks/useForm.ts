import React from "react"
import {
  useForm as useHookForm,
  UseFormOptions,
  ManualFieldError,
} from "react-hook-form"
import { ExecutionResult } from "@apollo/client"

import { useToast } from "./useToast"
import { MutationHandler, mutationHandler } from "../mutationHandler"

export function useForm<T extends {}>(props?: UseFormOptions<T>) {
  const toast = useToast()
  const [appError, setAppError] = React.useState<string | null | undefined>()
  const form = useHookForm<T>({
    mode: "onBlur",
    reValidateMode: "onChange",
    validateCriteriaMode: "all",
    ...props,
  })

  const setFieldErrors = (errors: ManualFieldError<T>[]) =>
    form.setError(errors)

  function handler<R>(
    res: ExecutionResult<NonNullable<R>> | void,
    handler?: MutationHandler<R>,
  ) {
    setAppError(null)
    mutationHandler(res, handler, { setAppError, setFieldErrors }, toast)
  }

  return {
    ...form,
    appError,
    setAppError,
    handler,
  }
}
