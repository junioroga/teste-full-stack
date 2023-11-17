import React, { useCallback } from 'react'

import format from 'date-fns/format'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

type Props = {
  show: boolean
  value: Date
  onSelect: (date?: string) => void
  onCancel: () => void
}

export const DatePicker = ({ show, value, onCancel, onSelect }: Props) => {
  const onHandleSelect = useCallback(
    (selectedDate: Date) => {
      const parsedDate = format(selectedDate, 'yyyy-MM-dd')

      onSelect(parsedDate)
    },
    [onSelect],
  )

  return (
    <DateTimePickerModal
      isVisible={show}
      date={value}
      mode="date"
      onConfirm={onHandleSelect}
      onCancel={onCancel}
      maximumDate={new Date()}
      locale="pt_BR"
    />
  )
}

export default DatePicker
