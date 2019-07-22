import { useApolloClient } from "react-apollo-hooks"
import {
  useLoginMutation,
  useMeQuery,
  useUpdateUserMutation,
  useRegisterMutation,
  useLogoutMutation,
  MeDocument,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../types"

export function useMe() {
  const { data, loading } = useMeQuery({ suspend: false })
  const user = (data && data.me) || null
  return { user, userLoading: loading }
}

export function useLogin() {
  return useLoginMutation({
    update: (cache, res) => {
      if (res.data) {
        cache.writeQuery({
          query: MeDocument,
          data: { me: res.data.login },
        })
      }
    },
  })
}

export function useUpdateUser() {
  return useUpdateUserMutation()
}

export function useRegister() {
  return useRegisterMutation({
    update: (cache, res) => {
      if (res.data) {
        cache.writeQuery({
          query: MeDocument,
          data: { me: res.data.register },
        })
      }
    },
  })
}

export function useLogout() {
  const client = useApolloClient()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    await logout({
      update: cache =>
        cache.writeQuery({ query: MeDocument, data: { me: null } }),
    })
    await client.resetStore()
  }

  return handleLogout
}

export function useForgotPassword() {
  return useForgotPasswordMutation()
}

export function useResetPassword() {
  return useResetPasswordMutation()
}
