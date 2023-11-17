import { useInfiniteQuery } from '@tanstack/react-query'
import flatMap from 'lodash/flatMap'

import { userService } from '@services'

type UserListHookProps = {
  limit?: number
  enabled?: boolean
}

export const useUserList = ({
  limit = 10,
  enabled = true,
}: UserListHookProps) => {
  const getUserList = async ({ pageParam = 0 }) => {
    const data = await userService.getAll({
      limit,
      offset: pageParam,
    })

    return {
      data: data.users,
      paging: data.pagination,
    }
  }

  return useInfiniteQuery(['user-list'], getUserList, {
    select: (data) => {
      const flattenData = flatMap(data?.pages, (page) => page?.data)

      return {
        pages: flattenData,
        pageParams: data.pageParams,
      }
    },
    enabled,
    getNextPageParam: (lastPage) =>
      lastPage.paging?.next > 0 ? lastPage.paging?.next : false,
  })
}
