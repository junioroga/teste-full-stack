import { api } from '@config/api'
import { PaginationProps } from '@services/types'

import { ResponseUserList, User } from './types'

const basePath = 'user'

const getAll = async (options: PaginationProps): Promise<ResponseUserList> => {
  const params = []
  let paramsQueries = ''

  if (Object.prototype.hasOwnProperty.call(options, 'limit')) {
    params.push(`limit=${options.limit}`)
  }

  if (Object.prototype.hasOwnProperty.call(options, 'offset')) {
    params.push(`offset=${options.offset}`)
  }

  if (params.length) {
    paramsQueries = `?${params.join('&')}`
  }

  const response = await api.get<ResponseUserList>(
    `${basePath}/list${paramsQueries}`,
  )

  return response.data
}

const getOne = async (options: { id: number }): Promise<User> => {
  const response = await api.get<User>(`${basePath}/${options.id}`)

  return response.data
}

const createOne = async (options: User): Promise<User> => {
  const response = await api.post<User>(`${basePath}/create/`, options)

  return response.data
}

const updateOne = async (options: User): Promise<User> => {
  const response = await api.put<User>(
    `${basePath}/${options.id}/edit`,
    options,
  )

  return response.data
}

const deleteOne = async (options: { id: number }): Promise<User> => {
  const response = await api.delete<User>(`${basePath}/delete/${options.id}`)

  return response.data
}

export { getAll, getOne, createOne, updateOne, deleteOne }
