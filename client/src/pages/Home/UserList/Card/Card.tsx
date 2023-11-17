import { Button, Card as TamaguiCard, XStack, YStack } from 'tamagui'

import { Text } from '@components'
import { formatStringBrazilian } from '@utils/date'

import { UserPrepared } from '../data'

type CardProps = {
  item: UserPrepared
  onPressUser: () => void
}

export const Card = ({ item, onPressUser }: CardProps) => (
  <TamaguiCard elevation="$4">
    <Button p="$3" unstyled onPress={onPressUser}>
      <YStack f={1} gap="$0.5">
        <Text fontWeight="$6" fontSize="$5">
          {item.name}
        </Text>
        <XStack ai="center" gap="$1.5">
          <Text fontWeight="$6">E-mail:</Text>
          <Text>{item.email}</Text>
        </XStack>
        <XStack ai="center" gap="$1.5">
          <Text fontWeight="$6">Endereço:</Text>
          <Text>{item.address}</Text>
        </XStack>
        <XStack ai="center" gap="$1.5">
          <Text fontWeight="$6">Nascimento:</Text>
          <Text>{formatStringBrazilian(item.birthdate)}</Text>
        </XStack>
        <XStack ai="center" gap="$1.5">
          <Text fontWeight="$6">Criado em:</Text>
          <Text>{item.createdAt}</Text>
        </XStack>
      </YStack>
    </Button>
  </TamaguiCard>
)
