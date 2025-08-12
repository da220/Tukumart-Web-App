import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './src/contexts/AuthContext'
import { HomeScreen } from './src/screens/HomeScreen'
import { LoginScreen } from './src/screens/LoginScreen'
import { RegisterScreen } from './src/screens/RegisterScreen'
import { AdvisoryScreen } from './src/screens/AdvisoryScreen'
import { MarketRatesScreen } from './src/screens/MarketRatesScreen'
import { NotificationsScreen } from './src/screens/NotificationsScreen'
import { OfficersScreen } from './src/screens/OfficersScreen'

export type RootStackParamList = {
  Home: undefined
  Login: undefined
  Register: undefined
  Advisories: undefined
  MarketRates: undefined
  Notifications: undefined
  Officers: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Advisories" component={AdvisoryScreen} />
            <Stack.Screen name="MarketRates" component={MarketRatesScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Officers" component={OfficersScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
