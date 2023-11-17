import { Appearance } from 'react-native'

export const settings = {
  theme: Appearance.getColorScheme() as 'light' | 'dark',
}
