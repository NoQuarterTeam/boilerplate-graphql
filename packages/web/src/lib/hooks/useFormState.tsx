import { useState } from "react"

function useFormState<T>(
  initialState: T,
): { formState: T; setFormState: (action: { [key: string]: any }) => void } {
  const [formState, setFormState] = useState(initialState)

  const handleUpdateState = (action: { [key: string]: any }) => {
    setFormState({ ...formState, ...action })
  }

  return { formState, setFormState: handleUpdateState }
}

export default useFormState
