import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '@pages/Home'
import { UserDetails } from '@pages/UserDetails'

export type RootStackParamList = {
  Home: undefined
  UserDetails: { id?: number }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
