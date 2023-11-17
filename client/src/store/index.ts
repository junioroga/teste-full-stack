import { observable } from '@legendapp/state'
import { persistObservable } from '@legendapp/state/persist'

import { ObservablePersistAsyncStorage } from './observablePersist'
import { settings } from './observers'

export const Store = observable({ settings })

persistObservable(Store, {
  local: 'store',
  pluginLocal: ObservablePersistAsyncStorage,
})
