import { useMutation, useQueryClient } from '@tanstack/react-query'

import { userService } from '@services'

type UserDeleteHookProps = {
  id: number
}

export const useUserDelete = ({ id }: UserDeleteHookProps) => {
  const queryClient = useQueryClient()

  const deleteUser = async () => {
    const data = await userService.deleteOne({
      id,
    })

    queryClient.invalidateQueries({ queryKey: ['user-list'] })
    queryClient.removeQueries({ queryKey: ['user-list'] })

    return data
  }

  return useMutation(deleteUser)
}
