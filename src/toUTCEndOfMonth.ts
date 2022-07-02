import endOfMonth from 'date-fns/endOfMonth'

/**
 * Get the end of month on UTC
 *
 * **NOTE: Depends on `date-fns`, you'll need to install date-fns**
 *
 * #### Example
 *
 *
 * ```js
 * import toUTCEndOfMonth from "@barelyhuman/useless/toUTCEndOfMonth"
 *
 * toUTCEndOfMonth(new Date(new Date(2022,3,15).setHours(15,0))) //=> 2022-04-30T23:59:59.999Z
 * ```
 */
export default function toUTCEndOfMonth(date: Date) {
  date = new Date(date)
  const offset = date.getTimezoneOffset()
  const endDate = endOfMonth(date)
  return new Date(
    new Date(endDate).setMinutes(new Date(endDate).getMinutes() - offset)
  )
}
