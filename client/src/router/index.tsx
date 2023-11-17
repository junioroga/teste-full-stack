import { Stack } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AppNavigation from '@navigation/AppNavigation'

export default function Router() {
  const insets = useSafeAreaInsets()

  return (
    <Stack f={1} bg="$background" pt={insets.top}>
      <AppNavigation />
    </Stack>
  )
}
