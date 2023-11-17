import { useMutation, useQueryClient } from '@tanstack/react-query'

import { userService } from '@services'
import { User } from '@services/userService/types'

export const useUserUpdate = () => {
  const queryClient = useQueryClient()

  const updateUser = async (data: User) => {
    const response = await userService.updateOne(data)

    return response
  }

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
      queryClient.removeQueries({ queryKey: ['user-list'] })
    },
  })

  return mutation
}
