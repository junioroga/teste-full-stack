import React, { ReactNode } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { Button, H5, XStack } from 'tamagui'

type Props = {
  title: string
  goBack?: boolean
  right?: ReactNode
}

export const Header = ({ title, goBack = true, right }: Props) => {
  const navigation = useNavigation()

  return (
    <XStack
      ai="center"
      jc="space-between"
      px="$4"
      gap="$2"
      bg="$background"
      py="$2">
      {goBack && (
        <Button bg="transparent" size="$2" onPress={navigation.goBack}>
          <Button.Icon>
            <ChevronLeft size="$1" />
          </Button.Icon>
        </Button>
      )}
      <H5 f={1} ta="left">
        {title}
      </H5>
      {right && right}
    </XStack>
  )
}
