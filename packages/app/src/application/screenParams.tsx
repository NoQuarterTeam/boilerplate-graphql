import { RouteProp } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"

export type ScreenParamsList = {
  Home: undefined
  Login: undefined
}

export type NavigationParams<T extends keyof ScreenParamsList> = StackNavigationProp<ScreenParamsList, T>

export type RouteParams<T extends keyof ScreenParamsList> = RouteProp<ScreenParamsList, T>
