import React from "react"
import { Router, Redirect, RouteComponentProps } from "@reach/router"

import { useUser } from "./providers/MeProvider"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { ForgotPassword } from "../pages/ForgotPassword"
import { ResetPassword } from "../pages/ResetPassword"

export const CheckAuth: React.FC = ({ children }) => {
  const user = useUser()

  return user ? (
    <>{children}</>
  ) : (
    <Router>
      <Login path="/" />
      <Register path="/register" />
      <ForgotPassword path="/forgot-password" />
      <ResetPassword path="/reset-password" />
      <RedirectToLogin default={true} />
    </Router>
  )
}

const RedirectToLogin: React.FC<RouteComponentProps> = () => {
  return <Redirect noThrow to="/" />
}
