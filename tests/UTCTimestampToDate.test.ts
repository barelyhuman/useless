import { test } from 'uvu'
import * as assert from 'uvu/assert'

import UTCTimestampToDate from '../src/UTCTimestampToDate'

test('pass on basic end time overlapping for TZ -5:00', () => {
  const dateForBlock = new Date('2022-07-01 00:00:00 GMT-0500')
  const tz = 'America/Chicago'

  const open = UTCTimestampToDate({
    refDate: dateForBlock,
    timestamp: '21:30:00',
    timezone: tz,
  })
  const close = UTCTimestampToDate({
    refDate: dateForBlock,
    timestamp: '03:30:00',
    timezone: tz,
  })

  assert.is(open, '2022-07-01T21:30:00.000Z')
  assert.is(close, '2022-07-02T03:30:00.000Z')
})

test('pass on another overlapt for TZ -5:00', () => {
  const open = UTCTimestampToDate({
    refDate: new Date('2022-07-01 00:00:00 GMT-0500'),
    timestamp: '23:30:00',
    timezone: 'America/Chicago',
  })
  const close = UTCTimestampToDate({
    refDate: new Date('2022-07-01 00:00:00 GMT-0500'),
    timestamp: '03:30:00',
    timezone: 'America/Chicago',
  })

  assert.is(open, '2022-07-01T23:30:00.000Z')
  assert.is(close, '2022-07-02T03:30:00.000Z')
})

test('pass on basic start time overlapping for TZ +5:30', () => {
  const dateForBlock = new Date('2022-07-01 00:00:00 GMT+0530')
  const tz = 'Asia/Kolkata'

  const open = UTCTimestampToDate({
    refDate: dateForBlock,
    timestamp: '19:00:00',
    timezone: tz,
  })

  const close = UTCTimestampToDate({
    refDate: dateForBlock,
    timestamp: '00:00:00',
    timezone: tz,
  })

  assert.is(open, '2022-06-30T19:00:00.000Z')
  assert.is(close, '2022-07-01T00:00:00.000Z')
})

test.run()
