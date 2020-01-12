import React from "react"
import { Router } from "@reach/router"

import { AppProvider } from "../components/providers/AppProvider"
import { CheckAuth } from "../components/CheckAuth"
import { Dashboard } from "../pages/Dashboard"

export function Application() {
  return (
    <AppProvider>
      <React.Suspense fallback={null}>
        <CheckAuth>
          <Router>
            <Dashboard path="/" />
          </Router>
        </CheckAuth>
      </React.Suspense>
    </AppProvider>
  )
}
