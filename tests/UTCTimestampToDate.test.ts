import { DateTime } from 'luxon'
import { test } from 'uvu'
import * as assert from 'uvu/assert'

import UTCTimestampToDate from '../src/UTCTimestampToDate'

// check every minute of all 24 hours.
// rather excessive but needed
const TIME_SLOTS_COUNT = 24
const TIME_SLOT_INTERVALS = 60
const TIME_SLOT_INTERVAL_MULTIPLIER = 1

const timezones = [
  'America/Chicago',
  'Africa/Algiers',
  'Asia/Kolkata',
  'America/Chicago',
  'Europe/Dublin',
]

timezones.forEach(tz => {
  for (let i = 0; i < TIME_SLOTS_COUNT; i += 1) {
    const hour = i
    for (let j = 0; j < TIME_SLOT_INTERVALS; j += 1) {
      const minute = j * TIME_SLOT_INTERVAL_MULTIPLIER
      generateTests(
        {
          hour,
          minute,
          second: 0,
          millisecond: 0,
        },
        tz
      )
    }
  }
})

function generateTests(timeobj, tz) {
  test(`${tz} | ${timeobj.hour}:${timeobj.minute}`, () => {
    const dateForBlock = DateTime.fromObject(
      {
        day: 1,
        month: 7,
        year: 2022,
      },
      { zone: tz }
    ).startOf('day')

    const timestampDate = DateTime.now()
      .setZone(tz)
      .set({
        day: dateForBlock.day,
        month: dateForBlock.month,
        ...timeobj,
      })
      .toUTC()

    const corrected = UTCTimestampToDate({
      refDate: dateForBlock.toISO(),
      timestamp: timestampDate.toFormat('HH:mm:ss'),
      timezone: tz,
    })

    assert.is(corrected, timestampDate.toISO())
  })
}

test('Manual | Overlap for +5:30', () => {
  const tz = 'Asia/Kolkata'
  const dateForBlock = DateTime.fromObject(
    {
      day: 1,
      month: 7,
      year: 2022,
    },
    { zone: tz }
  )

  const timestampDate = DateTime.now()
    .setZone(tz)
    .set({
      day: dateForBlock.day,
      month: dateForBlock.month,
      millisecond: 0,
      hour: 0,
      minute: 0,
      second: 0,
    })
    .toUTC()
  // should go back a day to 30th

  const corrected = UTCTimestampToDate({
    refDate: dateForBlock.toISO(),
    timestamp: timestampDate.toFormat('HH:mm:ss'),
    timezone: tz,
  })

  assert.is(corrected, timestampDate.toISO())
})

test.run()
