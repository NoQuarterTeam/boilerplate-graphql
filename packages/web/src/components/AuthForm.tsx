import React, { FC } from "react"
import styled from "../application/theme"
import Center from "./styled/Center"

interface AuthFormProps {
  handleSubmit: (e: any) => void
}
const AuthForm: FC<AuthFormProps> = ({ children, handleSubmit }) => {
  return (
    <StyledContainer>
      <Center style={{ height: "100vh" }}>
        <StyledForm onSubmit={handleSubmit}>{children}</StyledForm>
      </Center>
    </StyledContainer>
  )
}

export default AuthForm

const StyledContainer = styled.div`
  background-color: ${p => p.theme.colorPage};
`

const StyledForm = styled.form`
  height: 100%;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingL};
`
