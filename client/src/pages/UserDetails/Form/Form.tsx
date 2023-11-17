import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'

import { useUserCreate, useUserUpdate } from '@hooks'
import { useNavigation } from '@react-navigation/native'
import { Button, Input, YStack } from 'tamagui'
import Animated, { FadeInUp } from 'react-native-reanimated'
import Toast from 'react-native-toast-message'

import { DatePicker, Loading } from '@components'
import { Error } from '@config/api'
import { User } from '@services/userService/types'
import {
  formatAmericanDate,
  formatStringAmerican,
  formatStringBrazilian,
  formatStringToAmericanDate,
} from '@utils/date'

const fieldsRef = ['name', 'email', 'address', 'birthdate']

const AnimatedButton = Animated.createAnimatedComponent(Button)
const AnimatedInput = Animated.createAnimatedComponent(Input)

type Props = {
  data?: User
}

export const Form = ({ data }: Props) => {
  const [sending, setSending] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const updateUser = useUserUpdate()
  const createUser = useUserCreate()
  const navigation = useNavigation()

  const defaultValues = useMemo(
    () => ({
      name: data?.id ? data?.name : '',
      email: data?.id ? data?.email : '',
      address: data?.id ? data?.address : '',
      birthdate: data?.id
        ? data?.birthdate
        : (formatAmericanDate(new Date()) as any),
    }),
    [data],
  )

  const toggleDatePicker = useCallback(
    () => setShowDatePicker((old) => !old),
    [],
  )

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<User>({
    defaultValues,
  })

  const enableSubmit = isDirty && isValid

  const inputRefs = useMemo(
    () =>
      Array(fieldsRef.length)
        .fill(null)
        .map(() => createRef<TextInput>()),
    [],
  )

  useEffect(() => {
    if (data?.id) {
      reset(data)
    } else {
      reset(defaultValues)
      inputRefs[0].current?.focus()
    }
  }, [data, reset, defaultValues, inputRefs])

  const onEdit = useCallback(
    async (submittedData: User) => {
      if (!data?.id) return

      const formattedDate = formatStringAmerican(submittedData.birthdate)

      try {
        await updateUser.mutateAsync({
          ...submittedData,
          birthdate: formattedDate,
          id: data?.id,
        })

        Toast.show({
          type: 'success',
          text1: 'Sucesso! 🎉',
          text2: 'Dados alterados com sucesso. 👋',
          visibilityTime: 3000,
        })
        navigation.goBack()
      } catch (err) {
        const error = err as Error

        Toast.show({
          type: 'error',
          text1: 'Aconteceu alguma coisa! 😔',
          text2: error.error_message,
          visibilityTime: 3000,
        })
      } finally {
        setSending(false)
      }
    },
    [updateUser, data, navigation],
  )

  const onCreate = useCallback(
    async (submittedData: User) => {
      const formattedDate = formatStringAmerican(submittedData.birthdate)

      try {
        await createUser.mutateAsync({
          ...submittedData,
          birthdate: formattedDate,
        })

        Toast.show({
          type: 'success',
          text1: 'Sucesso! 🎉',
          text2: 'Usuário criado com sucesso. 👋',
          visibilityTime: 3000,
        })

        navigation.goBack()
      } catch (err) {
        const error = err as Error

        Toast.show({
          type: 'error',
          text1: 'Aconteceu alguma coisa! 😔',
          text2: error.error_message,
          visibilityTime: 3000,
        })
      } finally {
        setSending(false)
      }
    },
    [createUser, navigation],
  )

  const onSubmit = useCallback(
    async (submittedData: User) => {
      Keyboard.dismiss()
      setSending(true)

      if (data?.id) {
        onEdit(submittedData)
      } else {
        onCreate(submittedData)
      }

      reset(submittedData)
    },
    [data, onEdit, onCreate, reset],
  )

  return (
    <YStack gap="$4">
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({ field: { onBlur, onChange, value } }) => (
          <AnimatedInput
            entering={FadeInUp.delay(50).duration(150).springify()}
            ref={inputRefs[0]}
            placeholder="Nome completo"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            returnKeyType="next"
            onSubmitEditing={() => inputRefs[1]?.current?.focus()}
            autoCapitalize="words"
            autoCorrect={false}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        }}
        render={({ field: { onBlur, onChange, value } }) => (
          <AnimatedInput
            entering={FadeInUp.delay(100).duration(100).springify()}
            ref={inputRefs[1]}
            placeholder="E-mail"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => inputRefs[2]?.current?.focus()}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        rules={{ required: true, minLength: 3 }}
        render={({ field: { onBlur, onChange, value } }) => (
          <AnimatedInput
            entering={FadeInUp.delay(150).duration(100).springify()}
            ref={inputRefs[2]}
            placeholder="Endereço"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            returnKeyType="next"
            onSubmitEditing={toggleDatePicker}
            autoCapitalize="words"
            autoCorrect={false}
          />
        )}
      />
      <Controller
        name="birthdate"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <DatePicker
                show={showDatePicker}
                value={formatStringToAmericanDate(value)}
                onSelect={(date?: string) => {
                  toggleDatePicker()
                  onChange(date)
                }}
                onCancel={toggleDatePicker}
              />
              <AnimatedButton
                entering={FadeInUp.delay(200).duration(100).springify()}
                unstyled
                onPress={toggleDatePicker}>
                <Input
                  ref={inputRefs[3]}
                  placeholder="Nascimento"
                  value={formatStringBrazilian(value)}
                  editable={false}
                  returnKeyType="done"
                  onPressIn={toggleDatePicker}
                />
              </AnimatedButton>
            </>
          )
        }}
      />
      <AnimatedButton
        entering={FadeInUp.delay(250).duration(100).springify()}
        disabled={!enableSubmit}
        onPress={handleSubmit(onSubmit)}
        $theme-light={{ bg: enableSubmit ? '$blue8' : '$blue6' }}
        $theme-dark={{ bg: enableSubmit ? '$blue8' : '$blue2' }}>
        {sending ? (
          <Loading />
        ) : (
          <Button.Text
            $theme-light={{ color: enableSubmit ? '$color1' : '$color12' }}
            $theme-dark={{ color: '$color12' }}>
            Salvar
          </Button.Text>
        )}
      </AnimatedButton>
      <AnimatedButton
        entering={FadeInUp.delay(300).duration(100).springify()}
        disabled={!isDirty}
        onPress={() => reset()}
        $theme-light={{ bg: enableSubmit ? '$gray9' : '$gray4' }}
        $theme-dark={{ bg: enableSubmit ? '$gray8' : '$gray2' }}>
        <Button.Text
          $theme-light={{ color: enableSubmit ? '$color1' : '$color12' }}
          $theme-dark={{ color: '$color12' }}>
          Cancelar
        </Button.Text>
      </AnimatedButton>
    </YStack>
  )
}
