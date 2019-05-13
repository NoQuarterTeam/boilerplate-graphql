import React, { memo, useState, FC } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { GraphQLError } from "graphql"
import { useRegister } from "../lib/graphql/user/hooks"

import styled from "../application/theme"

import Button from "../components/Button"
import Input from "../components/Input"
import AuthForm from "../components/AuthForm"

const Register: FC<RouteComponentProps> = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const login = useRegister()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    login({
      variables: { data: { email, password, firstName, lastName } },
    }).catch((loginError: GraphQLError) => {
      setLoading(false)
      setError(loginError.message.split(":")[1])
    })
  }

  return (
    <AuthForm handleSubmit={handleSubmit}>
      <Input
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        required={true}
        placeholder="jim@gmail.com"
      />
      <br />
      <Input
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        required={true}
        placeholder="********"
      />
      <br />
      <Input
        label="First name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        type="text"
        required={true}
        placeholder="Jim"
      />
      <br />
      <Input
        label="Last name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        type="text"
        required={true}
        placeholder="Sebe"
      />
      <br />

      <Button loading={loading} full={true}>
        Login
      </Button>
      {error && <StyledError>{error}</StyledError>}
      <StyledLinks>
        <Link to="/login">
          <StyledLink>Login</StyledLink>
        </Link>
      </StyledLinks>
    </AuthForm>
  )
}

export default memo(Register)

const StyledLinks = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingL} 0;
  ${p => p.theme.flexBetween};
`

const StyledLink = styled.div`
  text-align: right;
  width: 100%;
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
