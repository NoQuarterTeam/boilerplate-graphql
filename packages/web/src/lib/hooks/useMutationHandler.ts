import type { FieldError } from "react-hook-form"
import type { UseToastOptions } from "@chakra-ui/react"
import * as Sentry from "@sentry/nextjs"
import type { ExecutionResult } from "graphql"

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
  onValidationError?: (errors: FieldError[], toast: (props: UseToastOptions) => void) => Promise<any> | any
  onAppError?: (message: string, toast: (props: UseToastOptions) => void) => Promise<any> | any
  onServerError?: (message: string, toast: (props: UseToastOptions) => void) => Promise<any> | any
  onFinish?: (toast: (props: UseToastOptions) => void) => Promise<any> | any
}

async function mutationHandler<T>(
  res: ExecutionResult<NonNullable<T>> | void,
  handler: MutationHandler<T>,
  toast: (props: UseToastOptions) => void,
  formActions?: {
    setFieldErrors: (errors: FieldError[]) => void
    setAppError: (message: any) => void
  },
) {
  try {
    if (!res) throw new Error("No response")
    if (res.data && !res.errors) {
      if (handler.onSuccess) {
        await handler.onSuccess(res.data, toast)
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
      toast({ status: "error", description: "Please login to continue." })
    } else if (res.errors?.[0].extensions?.exception?.validationErrors) {
      const validationErrors = res.errors?.[0].extensions?.exception?.validationErrors
      if (handler.onValidationError) {
        await handler.onValidationError(formatValidations(validationErrors), toast)
      } else if (formActions) {
        formActions.setFieldErrors(formatValidations(validationErrors))
      }
    } else if (res.errors?.[0].extensions?.code === "APP_ERROR") {
      if (handler.onAppError) {
        await handler.onAppError(res.errors[0].message, toast)
      } else {
        toast({ status: "error", description: res.errors[0].message })
      }
    } else if (res.errors?.[0].extensions?.code === "BAD_USER_INPUT" || res.errors?.[0].message) {
      Sentry.captureException(res.errors)
      if (handler.onServerError) {
        await handler.onServerError(res.errors[0].message, toast)
      } else {
        toast({ status: "error", description: "Server error. We have been notified." })
      }
    }
  } catch (e) {
    // If any of the handler callbacks error
    Sentry.captureException(e)
    console.log(e)
    toast({
      status: "error",
      description: "Application error. We have been notified.",
    })
  } finally {
    if (handler?.onFinish) {
      try {
        await handler.onFinish(toast)
      } catch (e) {
        Sentry.captureException(e)
        console.log(e)
        toast({
          status: "error",
          description: "Application error. We have been notified.",
        })
      }
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
      // Likely an internet connection issue, or an unknown server error
      Sentry.captureException(e)
      console.log(e)
      toast({
        title: "Something went wrong, we have been notified!",
        description: "Do you have an internet connection?",
        status: "error",
      })
      return
    }
  }
  return handle
}
