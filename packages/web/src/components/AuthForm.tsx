import React, { FC } from "react"
import { styled } from "@noquarter/ui"

import Center from "./styled/Center"
import Tile from "./styled/Tile"

interface AuthFormProps {
  handleSubmit: (e: any) => void
}
const AuthForm: FC<AuthFormProps> = ({ children, handleSubmit }) => {
  return (
    <StyledAuthContainer>
      <Tile style={{ width: 450 }}>
        <StyledForm onSubmit={handleSubmit}>{children}</StyledForm>
      </Tile>
    </StyledAuthContainer>
  )
}

export default AuthForm

const StyledAuthContainer = styled(Center)`
  height: 100vh;
  padding: ${p => p.theme.paddingL};
  background-color: ${p => p.theme.colorBackground};
`
const StyledForm = styled.form`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingL};
`
