import { RouteProp } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"

export type ScreenParamsList = {
  Login: undefined
  ForgotPassword: undefined
  Settings: undefined
  OrgSwitcher: undefined
  Map: undefined
  Scan: undefined
  NewBike: { name: string }
  Bike: { uuid: string; scanned?: boolean; returnScreen?: keyof ScreenParamsList }
  BikeAlerts: { uuid: string }
  BikeNotes: { uuid: string }
  BikeTags: { uuid: string }
  BikeTrips: { uuid: string }
  BikeTracker: { uuid: string }
  BikeLock: { uuid: string }
  BikeTrip: { uuid: string }
}

export type NavigationParams<T extends keyof ScreenParamsList> = StackNavigationProp<ScreenParamsList, T>

export type RouteParams<T extends keyof ScreenParamsList> = RouteProp<ScreenParamsList, T>
