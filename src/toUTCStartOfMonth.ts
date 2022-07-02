import startOfMonth from 'date-fns/startOfMonth'

/**
 * Get the start of month on UTC
 *
 * **NOTE: Depends on `date-fns`, you'll need to install date-fns**
 *
 * #### Example
 *
 *
 * ```js
 * import toUTCStartOfMonth from "@barelyhuman/useless/toUTCStartOfMonth"
 *
 * toUTCStartOfMonth(new Date(new Date(2022,3,15).setHours(15,0))) //=> 2022-04-01T00:00:00.000Z
 * ```
 */
export default function toUTCStartOfMonth(date: Date) {
  date = new Date(date)
  const offset = date.getTimezoneOffset()
  const startDate = startOfMonth(date)
  return new Date(
    new Date(startDate).setMinutes(new Date(startDate).getMinutes() - offset)
  )
}
