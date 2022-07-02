import { test } from 'uvu'
import * as assert from 'uvu/assert'

import timestringParser from '../src/timestringParser'

test('should parse non tz time string', () => {
  const ts = '00:50:00'
  const expected = new Date().setHours.call(
    new Date(),
    ...ts.split(':').map(x => parseInt(x, 10)),
    0
  )
  const out = timestringParser(ts).getTime()
  assert.equal(out, expected)
})

test('should parse tz time string', () => {
  const ts = '00:50:00+0530'
  const out = timestringParser(ts).getTime()
  // just confirm if it was parsed
  // date-fns would fail otherwise
  assert.type(out, 'number')
})

test('should parse tz time string', () => {
  const ts = '00:50:00+05:30'
  const out = timestringParser(ts).getTime()
  // just confirm if it was parsed
  // date-fns would fail otherwise
  assert.type(out, 'number')
})

test.run()
