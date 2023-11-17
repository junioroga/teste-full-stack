import Reactotron from 'reactotron-react-native'

declare global {
  interface Console {
    tron: any
  }
}

if (__DEV__) {
  const tron = Reactotron.configure({
    host: 'localhost',
  })
    .useReactNative()
    .connect()

  console.tron = tron
  console.tron.clear()
}
