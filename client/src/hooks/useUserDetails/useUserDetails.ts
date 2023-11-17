import { useQuery } from '@tanstack/react-query'

import { userService } from '@services'

type UserDetailsHookProps = {
  id: number
  enabled: boolean
}

export const useUserDetails = ({ id, enabled }: UserDetailsHookProps) => {
  const getUserDetails = async () => {
    const data = await userService.getOne({
      id,
    })

    return data
  }

  return useQuery(['user-details'], getUserDetails, { enabled })
}
