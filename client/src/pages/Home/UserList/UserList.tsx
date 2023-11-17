import { useCallback, useMemo } from 'react'
import { FlatList, ListRenderItem } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getTokens, Separator, YStack } from 'tamagui'

import { Loading, Text } from '@components'
import { RootStackParamList } from '@navigation/AppNavigation'
import { User } from '@services/userService/types'

import { Card } from './Card'
import { preparedData, UserPrepared } from './data'

type Props = Partial<Omit<ReturnType<typeof useInfiniteQuery>, 'data'>> & {
  limit: number
  data?: User[]
  onRefresh: () => void
  refreshingManual: boolean
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

export const UserList = ({
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  data,
  onRefresh,
  refreshingManual,
  limit,
}: Props) => {
  const navigation = useNavigation<NavigationProps>()

  const onPressUser = useCallback(
    (id: number) => {
      navigation.navigate('UserDetails', { id })
    },
    [navigation],
  )

  const renderItem: ListRenderItem<UserPrepared> = useCallback(
    ({ item }) => <Card item={item} onPressUser={() => onPressUser(item.id)} />,
    [onPressUser],
  )

  const renderSeparator = useCallback(() => <Separator my="$1.5" />, [])

  const renderEmpty = useCallback(
    () => (
      <YStack f={1} ai="center" jc="center">
        {isLoading ? <Loading /> : <Text>Sem usuários para listar 🍃</Text>}
      </YStack>
    ),
    [isLoading],
  )

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <YStack ai="center" jc="center" marginVertical="$3">
          <Loading />
        </YStack>
      )
    }

    return null
  }, [isFetchingNextPage])

  const keyExtractor = useCallback((item: UserPrepared) => String(item.id), [])

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      if (!isFetchingNextPage) {
        fetchNextPage?.()
      }
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage])

  const formattedData = useMemo(() => (data ? preparedData(data) : []), [data])

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={isLoading ? [] : formattedData}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      refreshing={refreshingManual}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      initialNumToRender={limit}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: getTokens().space[4].val,
        paddingTop: getTokens().space[2].val,
        paddingBottom: getTokens().space[10].val,
      }}
      showsVerticalScrollIndicator={false}
    />
  )
}
