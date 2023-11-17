import React, { useCallback } from 'react'
import { Keyboard } from 'react-native'

import { useUserDelete, useUserDetails } from '@hooks'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { UserX } from '@tamagui/lucide-icons'
import { Button, getTokens, ScrollView, YStack } from 'tamagui'
import Toast from 'react-native-toast-message'

import { AlertDialog, Header, Loading } from '@components'
import { RootStackParamList } from '@navigation/AppNavigation'
import { User } from '@services/userService/types'

import { Form } from './Form'

type Props = NativeStackScreenProps<RootStackParamList, 'UserDetails'>

export const UserDetails = ({ route }: Props) => {
  const id = route.params.id ?? 0
  const navigation = useNavigation()

  const { mutate: deleteUser } = useUserDelete({ id })

  const { data, isFetching } = useUserDetails({
    id,
    enabled: id > 0,
  })

  const onDelete = useCallback(() => {
    try {
      deleteUser()
      navigation.goBack()

      Toast.show({
        type: 'info',
        text1: 'Sucesso!',
        text2: 'Usuário excluído. 👋',
        visibilityTime: 3000,
      })
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Aconteceu alguma coisa! 😔',
        text2: 'Não conseguimos processar a solicitação.',
        visibilityTime: 3000,
      })
    }
  }, [deleteUser, navigation])

  return (
    <YStack f={1} bg="$background">
      <Header
        title="Detalhes"
        right={
          id ? (
            <AlertDialog
              title="Exclusão"
              description={`Você deseja excluir o usuário ${data?.name}?`}
              onConfirm={onDelete}
              trigger={
                <Button size="$3" onPress={Keyboard.dismiss}>
                  <Button.Icon>
                    <UserX size="$1" />
                  </Button.Icon>
                </Button>
              }
            />
          ) : null
        }
      />
      {isFetching ? (
        <YStack f={1} ai="center" jc="center">
          <Loading />
        </YStack>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: getTokens().space[4].val,
            paddingTop: getTokens().space[2].val,
            paddingBottom: getTokens().space[4].val,
          }}>
          <Form data={{ ...data, id } as User} />
        </ScrollView>
      )}
    </YStack>
  )
}
