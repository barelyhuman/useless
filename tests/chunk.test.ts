import {test} from 'uvu'
import * as assert from 'uvu/assert'
import chunk from '../src/chunk'

test('should return empty array', () => {
	const result = chunk([], 1)
	assert.equal(result, [])
})

test('should chunk for given number', () => {
	const input = [1, 2, 3]
	const input2 = [1, 2, 3, 4]

	const expected = [[1, 2], [3]]
	const expected2 = [
		[1, 2],
		[3, 4],
	]

	const result = chunk(input, 2)
	const result2 = chunk(input2, 2)

	assert.equal(result, expected)
	assert.equal(result2, expected2)
})

test.run()
