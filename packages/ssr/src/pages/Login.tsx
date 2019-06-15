import React, { memo } from "react"
import Link from "next/link"
import { Button, Input, styled } from "@noquarter/ui"
import { useForm } from "@noquarter/hooks"
import { GraphQLError } from "graphql"
import { useLogin } from "../lib/graphql/user/hooks"

import AuthForm from "../components/AuthForm"
import Router from "next/router"

function Login() {
  const [form, dispatch] = useForm({ email: "", password: "" })
  const { email, password } = form.values

  const login = useLogin()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch({ type: "loading" })
    login({
      variables: { data: { email, password } },
    })
      .then(() => Router.replace("/dashboard"))
      .catch((error: GraphQLError) => {
        dispatch({
          type: "error",
          error: error.message.split(":")[1],
        })
      })
  }

  return (
    <AuthForm handleSubmit={handleSubmit}>
      <Input
        label="Email"
        value={email}
        onChange={e =>
          dispatch({ type: "update", field: { email: e.target.value } })
        }
        type="email"
        required={true}
        placeholder="jim@gmail.com"
      />
      <br />
      <Input
        label="Password"
        value={password}
        onChange={e =>
          dispatch({ type: "update", field: { password: e.target.value } })
        }
        type="password"
        required={true}
        placeholder="********"
      />
      <br />
      <Button loading={form.loading} full={true}>
        Login
      </Button>
      {form.error && <StyledError>{form.error}</StyledError>}
      <StyledLinks>
        <Link href="/register">
          <StyledLink>Register</StyledLink>
        </Link>
        <Link href="/forgot-password">
          <StyledLink>Forgot password?</StyledLink>
        </Link>
      </StyledLinks>
    </AuthForm>
  )
}

export default memo(Login)

const StyledLinks = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingL} 0;
  ${p => p.theme.flexBetween};
`

const StyledLink = styled.a`
  text-decoration: none;
  outline: none;
  cursor: pointer;
  color: ${p => p.theme.colorText};
  padding: ${p => p.theme.paddingS};
  font-size: ${p => p.theme.textM};

  &:hover {
    opacity: 0.8;
  }
  &:focus {
    text-decoration: underline;
  }
`
const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  color: ${p => p.theme.colorText};
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
