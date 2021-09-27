import { FieldError } from "react-hook-form"
import { ExecutionResult } from "graphql"
import { IToastProps, useToast } from "native-base"

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
  onSuccess?: (data: NonNullable<T>) => Promise<any> | any
  onValidationError?: (errors: FieldError[]) => void
  onAppError?: (message: string) => void
  onServerError?: (message: string) => void
  onFinish?: () => void
}

function mutationHandler<T>(
  res: ExecutionResult<NonNullable<T>> | void,
  handler: MutationHandler<T>,
  toast: (props: IToastProps) => void,
  actions?: {
    setFieldErrors: (errors: FieldError[]) => void
    setAppError: (message: any) => void
  },
) {
  try {
    if (!res) throw new Error("No response")
    if (res.data && !res.errors) {
      if (handler?.onSuccess) {
        handler.onSuccess(res.data)
      }
    } else if (
      res.errors?.[0].message.includes("Access denied!") ||
      res.errors?.[0].message.includes("Not authorized")
    ) {
      toast({
        status: "error",
        description: "You cannot perform this action",
      })
    } else if (res.errors?.[0].extensions?.exception?.validationErrors) {
      const validationErrors = res.errors?.[0].extensions?.exception?.validationErrors
      if (handler?.onValidationError) {
        handler.onValidationError(formatValidations(validationErrors))
      } else if (actions) {
        actions.setFieldErrors(formatValidations(validationErrors))
      }
    } else if (res.errors?.[0].extensions?.code === "BAD_USER_INPUT") {
      if (handler?.onAppError) {
        handler.onAppError(res.errors[0].message)
      } else {
        toast({ status: "error", description: res.errors[0].message })
      }
    } else if (res.errors?.[0].message) {
      if (handler?.onServerError) {
        handler.onServerError(res.errors[0].message)
      } else {
        toast({
          status: "error",
          description: "Server error. We have been notified.",
        })
      }
    }
  } catch (e) {
    console.log(e)
    toast({
      status: "error",
      description: "Server error. We have been notified.",
    })
  } finally {
    if (handler?.onFinish) {
      handler.onFinish()
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
      return mutationHandler(res, actions || {}, toast.show, formActions)
    } catch (e) {
      console.log(e)
      toast.show({
        description: "Something went wrong. We have been notified!",
        status: "error",
      })
      return
    }
  }
  return handle
}
