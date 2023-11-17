import { AlertDialog as AlertDialogTamagui, Button, YStack } from 'tamagui'

type Props = {
  title: string
  description: string
  trigger: React.ReactNode
  onConfirm: () => void
}

export const AlertDialog = ({
  title,
  description,
  trigger,
  onConfirm,
}: Props) => (
  <AlertDialogTamagui>
    <AlertDialogTamagui.Trigger asChild>{trigger}</AlertDialogTamagui.Trigger>
    <AlertDialogTamagui.Portal>
      <AlertDialogTamagui.Overlay
        key="overlay"
        animation="quick"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <AlertDialogTamagui.Content
        bordered
        elevate
        key="content"
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        x={0}
        scale={1}
        opacity={1}
        y={0}>
        <YStack space>
          <AlertDialogTamagui.Title fontSize="$7" fontWeight="$7">
            {title}
          </AlertDialogTamagui.Title>
          <AlertDialogTamagui.Description fontSize="$3" fontWeight="$4">
            {description}
          </AlertDialogTamagui.Description>
          <YStack space="$3">
            <AlertDialogTamagui.Action asChild>
              <Button backgroundColor="$red11" onPress={onConfirm} size="$3">
                <Button.Text
                  $theme-light={{ color: '$color1' }}
                  $theme-dark={{ color: '$color12' }}
                  fontWeight="$5">
                  Confirmar
                </Button.Text>
              </Button>
            </AlertDialogTamagui.Action>
            <AlertDialogTamagui.Cancel asChild>
              <Button backgroundColor="$gray6" size="$3">
                <Button.Text color="$color12" fontWeight="$5">
                  Cancelar
                </Button.Text>
              </Button>
            </AlertDialogTamagui.Cancel>
          </YStack>
        </YStack>
      </AlertDialogTamagui.Content>
    </AlertDialogTamagui.Portal>
  </AlertDialogTamagui>
)
