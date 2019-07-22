import React, { memo, FC } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { GraphQLError } from "graphql"

import { Button, Input, styled } from "@noquarter/ui"
import { useForm } from "@noquarter/hooks"
import { useRegister } from "../lib/graphql/user/hooks"

import AuthForm from "../components/AuthForm"

const Register: FC<RouteComponentProps> = () => {
  const [form, dispatch] = useForm({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })
  const { email, password, firstName, lastName } = form.values

  const [register] = useRegister()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch({ type: "loading" })
    register({
      variables: { data: { ...form.values } },
    }).catch((error: GraphQLError) => {
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
      <Input
        label="First name"
        value={firstName}
        onChange={e =>
          dispatch({ type: "update", field: { firstName: e.target.value } })
        }
        type="text"
        required={true}
        placeholder="Jim"
      />
      <br />
      <Input
        label="Last name"
        value={lastName}
        onChange={e =>
          dispatch({ type: "update", field: { lastName: e.target.value } })
        }
        type="text"
        required={true}
        placeholder="Sebe"
      />
      <br />

      <Button loading={form.loading} full={true}>
        Register
      </Button>
      {form.error && <StyledError>{form.error}</StyledError>}
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
