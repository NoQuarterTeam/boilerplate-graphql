import { ExecutionResult } from "graphql"
import { useToastOptions } from "@chakra-ui/core"
import { ManualFieldError } from "react-hook-form"
import { formatValidations } from "./helpers"

export interface MutationHandler<T> {
  onSuccess?: (data: NonNullable<T>) => void
  onValidationError?: (errors: ManualFieldError<any>[]) => void
  onAppError?: (message: string) => void
  onServerError?: (message: string) => void
}

export function mutationHandler<T>(
  res: ExecutionResult<NonNullable<T>> | void,
  handler?: MutationHandler<T>,
  actions?: {
    setFieldErrors: (errors: ManualFieldError<any>[]) => void
    setAppError: (message: any) => void
  },
  toast?: (props: useToastOptions) => void,
) {
  if (!res) return
  try {
    if (res.data && !res.errors) {
      if (handler?.onSuccess) {
        return handler.onSuccess(res.data)
      }
    }
    const validationErrors =
      res.errors?.[0].extensions?.exception?.validationErrors
    if (validationErrors) {
      if (handler?.onValidationError) {
        return handler.onValidationError(formatValidations(validationErrors))
      } else if (actions) {
        return actions.setFieldErrors(formatValidations(validationErrors))
      }
    }

    if (res.errors?.[0].extensions?.code === "BAD_USER_INPUT") {
      if (handler?.onAppError) {
        return handler.onAppError(res.errors[0].message)
      } else if (actions) {
        return actions.setAppError(res.errors[0].message)
      }
    }
    if (res.errors?.[0].message) {
      if (handler?.onServerError) {
        return handler.onServerError(res.errors[0].message)
      } else if (toast) {
        return toast({ status: "error", description: res.errors[0].message })
      }
    }
  } catch (e) {
    if (toast) {
      return toast({ status: "error", description: e.message })
    }
  }
}
