import * as React from "react"
import { enableScreens } from "react-native-screens"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Home } from "../screens/Home"
import { Login } from "../screens/Login"

enableScreens()

const Container = createNativeStackNavigator()

// This is entry point + where the modals live
export function Screens() {
  return (
    <NavigationContainer>
      <Container.Navigator
        initialRouteName="MainStack"
        screenOptions={{ presentation: "modal", headerShown: false }}
      >
        <Container.Screen name="MainStack" component={MainStack} />
        <Container.Screen name="Login" component={Login} />
      </Container.Navigator>
    </NavigationContainer>
  )
}

// This is where normal the screens go, they may be just a screen or a stack containing more screens
const Main = createNativeStackNavigator()
function MainStack() {
  return (
    <Main.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Main.Screen name="Home" component={Home} />
    </Main.Navigator>
  )
}
