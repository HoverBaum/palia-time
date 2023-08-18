export type PaliaTimeOfDay = 'morning' | 'day' | 'evening' | 'night'

export type PaliaTime = {
  hours: number
  amHours: number
  minute: number
  second: number
  secondsSinceMidnight: number
  timeOfDay: PaliaTimeOfDay
}

export const timeToPaliaSecondsSinceMidnight = (now: Date): number => {
  const millisSinceFullHour = now.getTime() % 3600000
  const millisInAnHour = 3600000
  const secondsInADay = 86400

  // An hour in real time equals a day in palia time.
  // millisSinceFullHour / millisInAnHour = PaliaSecondsSinceMidnight / secondsInADay
  // Which leads us to this calculation.
  const paliaSecondsSinceMidnight = Math.floor(
    (millisSinceFullHour / millisInAnHour) * secondsInADay
  )
  return paliaSecondsSinceMidnight
}

export const currentPaliaSecondsSinceMidnight = (): number =>
  timeToPaliaSecondsSinceMidnight(new Date())

export const paliaSecondsSinceMidnightToPaliaTime = (
  paliaSeconds: number
): PaliaTime => {
  const secondsInAnHour = 3600
  const secondsInAMinute = 60

  const hours = Math.floor(paliaSeconds / secondsInAnHour)
  const minute = Math.floor((paliaSeconds % 3600) / 60)
  const second = paliaSeconds % secondsInAMinute
  let timeOfDay: PaliaTimeOfDay = 'night'
  if (hours >= 3) timeOfDay = 'morning'
  if (hours >= 6) timeOfDay = 'day'
  if (hours >= 18) timeOfDay = 'evening'
  if (hours >= 21) timeOfDay = 'night'

  return {
    hours,
    amHours: hours <= 12 ? hours : hours - 12,
    minute,
    second,
    secondsSinceMidnight: paliaSeconds,
    timeOfDay,
  }
}

export const currentPaliaTime = (): PaliaTime =>
  paliaSecondsSinceMidnightToPaliaTime(currentPaliaSecondsSinceMidnight())

export const paliaSecondsToDateString = (paliaSeconds: number): string => {
  const paliaTime = paliaSecondsSinceMidnightToPaliaTime(paliaSeconds)
  return paliaTimeToDateString(paliaTime)
}

export const paliaTimeToDateString = (paliaTime: PaliaTime): string =>
  `${paliaTime.hours.toString().padStart(2, '0')}:${paliaTime.minute
    .toString()
    .padStart(2, '0')}`
