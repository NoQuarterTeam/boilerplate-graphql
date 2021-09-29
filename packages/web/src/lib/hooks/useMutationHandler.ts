import { FieldError } from "react-hook-form"
import { UseToastOptions } from "@chakra-ui/react"
import * as Sentry from "@sentry/nextjs"
import { ExecutionResult } from "graphql"

import { useToast } from "./useToast"

export interface ValidationError {
  property: string
  constraints: { [key: string]: string }
}

export function formatValidations(errors: ValidationError[]): FieldError[] {
  return errors.map((error) => ({
    name: error.property,
    type: error.property,
    types: error.constraints,
  }))
}

export interface MutationHandler<T> {
  onSuccess?: (data: NonNullable<T>, toast: (props: UseToastOptions) => void) => Promise<any> | any
  onValidationError?: (errors: FieldError[], toast: (props: UseToastOptions) => void) => void
  onAppError?: (message: string, toast: (props: UseToastOptions) => void) => void
  onServerError?: (message: string, toast: (props: UseToastOptions) => void) => void
  onFinish?: (toast: (props: UseToastOptions) => void) => void
}

function mutationHandler<T>(
  res: ExecutionResult<NonNullable<T>> | void,
  handler: MutationHandler<T>,
  toast: (props: UseToastOptions) => void,
  actions?: {
    setFieldErrors: (errors: FieldError[]) => void
    setAppError: (message: any) => void
  },
) {
  try {
    if (!res) throw new Error("No response")
    if (res.data && !res.errors) {
      if (handler.onSuccess) {
        handler.onSuccess(res.data, toast)
      }
    } else if (
      res.errors?.[0].message.includes("Access denied!") ||
      res.errors?.[0].message.includes("Not authorized")
    ) {
      toast({
        status: "error",
        description: "You are not authorized to perform this action.",
      })
    } else if (res.errors?.[0].message.includes("Not authenticated")) {
      toast({
        status: "error",
        description: "Please login to continue.",
      })
    } else if (res.errors?.[0].extensions?.exception?.validationErrors) {
      const validationErrors = res.errors?.[0].extensions?.exception?.validationErrors
      if (handler.onValidationError) {
        handler.onValidationError(formatValidations(validationErrors), toast)
      } else if (actions) {
        actions.setFieldErrors(formatValidations(validationErrors))
      }
    } else if (res.errors?.[0].extensions?.code === "BAD_USER_INPUT") {
      if (handler.onAppError) {
        handler.onAppError(res.errors[0].message, toast)
      } else {
        toast({ status: "error", description: res.errors[0].message })
      }
    } else if (res.errors?.[0].message) {
      if (handler.onServerError) {
        handler.onServerError(res.errors[0].message, toast)
      } else {
        toast({
          status: "error",
          description: "Server error. We have been notified.",
        })
      }
    }
  } catch (e) {
    Sentry.captureException(e)
    console.log(e)
    toast({
      status: "error",
      description: "Server error. We have been notified.",
    })
  } finally {
    if (handler?.onFinish) {
      handler.onFinish(toast)
    }
    return res
  }
}

export function useMutationHandler() {
  const toast = useToast()
  async function handle<T>(
    mutation: () => Promise<ExecutionResult<NonNullable<T>> | void>,
    actions?: MutationHandler<T>,
    formActions?: {
      setFieldErrors: (errors: FieldError[]) => void
      setAppError: (message: any) => void
    },
  ) {
    try {
      const res = await mutation()
      return mutationHandler(res, actions || {}, toast, formActions)
    } catch (e) {
      // TODO: is block this needed?
      Sentry.captureException(e)
      console.log(e)
      toast({
        description: "Something went wrong. We have been notified!",
        status: "error",
      })
      return
    }
  }
  return handle
}
