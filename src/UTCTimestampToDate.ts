/**
 * `UTCTimestampToDate` is a helper to get the correct date in UTC
 * based on requested date in a particular timezone.
 *
 * > **Note**: luxon is a peerDependency for this, please install it with `npm i luxon`
 *
 * A very common example would be the availability ranges when working
 * with booking systems.
 *
 * If you've build one, you'll know that you might want to store a day of availability
 * to figure out if a particular entity is bookable on that day and if bookable
 * between what time can it be booked.
 *
 * so example,
 * Monday, 2:30PM - 5:30PM EntityA is available to be booked.
 *
 * The problem comes in picture when you store this in your DB. In most cases the translation to
 * UTC just works but when working with timezones that might differ in date altogether from UTC, you
 * have a problem.
 *
 * If the above is changed to
 * Monday, 6:30PM - 10:30PM - based on, 1st July, 2022 in Central Time (America/Chicago) -5:00 hours from UTC
 * then when you store EntityA's data in your DB you have to make sure you save the requested weekday's data
 * and the timezone that it aligns to.
 *```
 * Monday -> 0 (iso weekday)
 *
 * 6:30PM -> 18:30:00 -> open time
 *
 * 10:30PM -> 22:30:00 -> close time
 *
 * America/Chicago -> America/Chicago
 *```
 *
 * If so, great!
 * You can use all that to translate the data
 * but, when working with a UTC centric server, the above changes a bit.
 *```
 * Monday -> 0 (iso weekday)
 *
 * 6:30PM -> 23:30:00 of 1st July on UTC -> open time
 *
 * 10:30PM -> 03:30:00 of 2nd July on UTC -> close time
 *
 * America/Chicago -> America/Chicago
 *```
 *
 * The problem is that now the timestamps are
 * 1. invalid
 * 2. complicated to decipher in logic
 *
 * but this is still followed by certain standards to maintain
 * the server at UTC and keep everything in a single timezone
 *
 * now when given the timestamps 23:30:00, 03:30:00 , if you wish to find out which one is
 * on the previous day and which one is on the next day, `UTCTimestampToDate` can be helpful.
 *
 * `UTCTimestampToDate` takes in a `refDate` which is the actual date in the timezone you are
 * working for.
 * so in this case this would be 1 July,2022 in UTC-5:00 so in code `new Date("2022-07-01 00:00:00 GMT-0500")`
 * you can also use utilities like luxon / moment to create this date for you.
 *
 * This is then used to translate and generate the correct date on UTC for the
 * given `timestamp`
 *
 * example:
 * ```ts
 * import UTCTimestampToDate from "@barelyhuman/useless/UTCTimestampToDate"
 *
 * const { corrected: open } = UTCTimestampToDate({
 * 	 refDate: new Date("2022-07-01 00:00:00 GMT-0500"),
 *	 timestamp: '23:30:00',
 * 	 timezone: "America/Chicago",
 * }) // date would be 1st July 23:30:00
 * const { corrected: close } = UTCTimestampToDate({
 * 	 refDate: new Date("2022-07-01 00:00:00 GMT-0500"),
 *	 timestamp: '03:30:00',
 * 	 timezone: "America/Chicago",
 * }) // date would be 2nd July 03:30:00
 * ```
 *
 * this allows you to have the correct date+time range when working from any timezone
 * and still being able to get a valid translation on UTC
 *
 * @module
 */

import { DateTime } from 'luxon'

export interface UTCTimestampToDateParams {
  refDate: Date | string
  timestamp: string
  timezone: string
}

const UTCTimestampToDate = ({
  refDate,
  timestamp,
  timezone,
}: UTCTimestampToDateParams) => {
  const timestampSplit = timestamp.split(':')

  if (timestampSplit.length !== 3)
    throw new Error('[dates] UTCTimestampToDate: invalid timestamp')

  let baseDate: any
  if (typeof refDate === 'string') {
    baseDate = DateTime.fromISO(refDate, {
      zone: timezone,
    })
  }

  if (refDate instanceof Date) {
    baseDate = DateTime.fromJSDate(refDate, {
      zone: timezone,
    })
  }

  if (!baseDate) throw new Error('[dates] Invalid date reference')

  // used as the date for changes in time as converting between local times
  // can create disparity
  let randomDateInUTC = DateTime.utc().startOf('day')

  // set the given timestamp in utc without any reference to the requested date
  randomDateInUTC = randomDateInUTC.set({
    hour: parseInt(timestampSplit[0], 10),
    minute: parseInt(timestampSplit[1], 10),
    second: parseInt(timestampSplit[2], 10),
    millisecond: 0,
  })

  // move the timestamp to the requested timezone, this will either
  // move the date up or down based on the timezone
  // then we correct the date to match with
  // the requested date, thus creating the original timestamp
  // in the requested timezone
  const corrected = randomDateInUTC.setZone(timezone).set({
    day: baseDate.day,
    month: baseDate.month,
    year: baseDate.year,
  })

  // return the corrected value by converting it back into UTC
  return corrected.toUTC().toISO() as string
}

export default UTCTimestampToDate
