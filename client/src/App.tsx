import { useCallback } from 'react'

import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from '@expo-google-fonts/poppins'
import { observer } from '@legendapp/state/react'
import { Store } from '@store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ptBR } from 'date-fns/locale'
import setDefaultOptions from 'date-fns/setDefaultOptions'
import { TamaguiProvider, Theme } from 'tamagui'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import '@config/reactotron'

import config from '../tamagui.config'
import Router from './router'

SplashScreen.preventAutoHideAsync()
const queryClient = new QueryClient()

export const App = observer(() => {
  setDefaultOptions({ locale: ptBR })
  const theme = Store.settings.theme.get()
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return <></>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
        <Theme name={theme}>
          <SafeAreaProvider
            initialMetrics={initialWindowMetrics}
            onLayout={onLayoutRootView}>
            <Router />
            <Toast topOffset={initialWindowMetrics?.insets.top} />
          </SafeAreaProvider>
        </Theme>
      </TamaguiProvider>
    </QueryClientProvider>
  )
})
