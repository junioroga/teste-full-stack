const padTo2Digits = (num: number) => num.toString().padStart(2, '0')

export const formatAmericanDateWithZero = (date: Date): string => {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-')
}

export const formatAmericanDate = (date: Date): string => {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
}

export const formatStringBrazilian = (date: string): string => {
  return [
    padTo2Digits(Number(date.substring(8, 10))),
    padTo2Digits(Number(date.substring(5, 7))),
    date.substring(0, 4),
  ].join('/')
}

export const formatStringBrazilianToAmerican = (date: string): string => {
  return (
    date.substring(6, 10) +
    '-' +
    date.substring(3, 5) +
    '-' +
    date.substring(0, 2)
  )
}

export const formatStringAmerican = (date: string): string => {
  return (
    date.substring(0, 4) +
    '-' +
    date.substring(5, 7) +
    '-' +
    date.substring(8, 10)
  )
}

export const formatStringToAmericanDate = (date: string): Date => {
  return new Date(
    Number(date.substring(0, 4)),
    Number(date.substring(5, 7)) - 1,
    Number(date.substring(8, 10)),
  )
}
