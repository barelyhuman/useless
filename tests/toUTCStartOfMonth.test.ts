import { test } from 'uvu'
import * as assert from 'uvu/assert'

import toUTCStartOfMonth from '../src/toUTCStartOfMonth'

test('should match start of month', () => {
  const expected = 1648771200000
  const today = new Date(2022, 3, 15)
  const out = toUTCStartOfMonth(today).getTime()
  assert.equal(out, expected)
})

test.run()
