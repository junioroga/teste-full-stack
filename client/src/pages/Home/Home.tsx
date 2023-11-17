import { useState } from 'react'

import { useUserList } from '@hooks'
import { observer } from '@legendapp/state/react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Store } from '@store/index'
import { Moon, Sun, UserPlus } from '@tamagui/lucide-icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Switch, XStack, YStack } from 'tamagui'

import { Header } from '@components/Header'
import { RootStackParamList } from '@navigation/AppNavigation'

import { UserList } from './UserList'

const LIMIT = 10

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

export const Home = observer(() => {
  const navigation = useNavigation<NavigationProps>()
  const queryClient = useQueryClient()
  const [refreshingManual, setRefreshingManual] = useState(false)
  const [theme, setTheme] = [
    Store.settings.theme.get(),
    Store.settings.theme.set,
  ]

  const {
    refetch,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
  } = useUserList({})

  const refetchQuery = () => {
    queryClient.removeQueries({ queryKey: ['user-list'] })
    refetch()
  }

  const onRefresh = () => {
    if (data?.pages.length) {
      setRefreshingManual(true)
      refetchQuery()
      setRefreshingManual(false)
    }
  }

  return (
    <YStack f={1} bg="$background">
      <Header
        title="Usuários"
        goBack={false}
        right={
          <XStack ai="center" gap="$2">
            <Switch
              checked={theme === 'dark'}
              size="$2.5"
              onCheckedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }>
              <Switch.Thumb
                ai="center"
                jc="center"
                animation="bouncy"
                bg={theme === 'light' ? '$color1' : '$gray10'}>
                {theme === 'light' ? (
                  <Sun size={18} color="$yellow10" />
                ) : (
                  <Moon size={18} color="white" />
                )}
              </Switch.Thumb>
            </Switch>
            <Button
              size="$3"
              onPress={() => navigation.navigate('UserDetails', {})}>
              <Button.Icon>
                <UserPlus size="$1" />
              </Button.Icon>
            </Button>
          </XStack>
        }
      />
      <UserList
        isLoading={isFetching && !isFetchingNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        data={data?.pages}
        onRefresh={onRefresh}
        refreshingManual={refreshingManual}
        limit={LIMIT}
      />
    </YStack>
  )
})
