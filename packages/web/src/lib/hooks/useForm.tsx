import { useReducer } from "react"

export interface Action {
  type: string
  [key: string]: any
}

const initialState = {
  dirty: false,
  loading: false,
  error: null,
  fieldErrors: null,
}
const formReducer = (state: any, action: Action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        dirty: true,
        values: { ...state.values, ...action.field },
      }
    case "loading":
      return { ...state, loading: true }
    case "error":
      return {
        ...state,
        loading: false,
        error: action.error,
        fieldErrors: action.fieldErrors,
      }
    case "reset":
      return {
        values: action.values,
        ...initialState,
      }
    case "finished":
      return {
        ...state,
        dirty: false,
        loading: false,
        error: null,
        fieldErrors: null,
      }
    default:
      throw new Error()
  }
}

export function useForm<T>(values: T) {
  return useReducer(formReducer, { ...initialState, values })
}

export default useForm
