import format from 'date-fns/format'
import map from 'lodash/map'

import { User } from '@services/userService/types'

export interface UserPrepared extends User {
  createdAt: string
}

export const preparedData = (data: User[]): UserPrepared[] =>
  map(data, (item) => ({
    ...item,
    createdAt: format(new Date(item.created_at), 'dd/MM/yyyy HH:mm'),
  }))
