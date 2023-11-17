import { useMutation, useQueryClient } from '@tanstack/react-query'

import { userService } from '@services'
import { User } from '@services/userService/types'

export const useUserCreate = () => {
  const queryClient = useQueryClient()

  const createUser = async (data: User) => {
    const response = await userService.createOne(data)

    return response
  }

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
      queryClient.removeQueries({ queryKey: ['user-list'] })
    },
  })

  return mutation
}
