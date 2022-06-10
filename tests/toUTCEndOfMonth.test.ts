import {test} from 'uvu'
import * as assert from 'uvu/assert'

import toUTCEndOfMonth from '../src/toUTCEndOfMonth'

test('should match end of month', () => {
	const expected = 1651363199999
	const today = new Date(2022, 3, 15)
	const out = toUTCEndOfMonth(today).getTime()
	assert.equal(out, expected)
})

test.run()
