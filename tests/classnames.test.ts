import {test} from 'uvu'
import * as assert from 'uvu/assert'

import classnames from '../src/classnames'

test('should return type string', () => {
	const result = classnames()
	assert.type(result, 'string')
})

test('should concat strings', () => {
	const expected = 'hello world'
	const result = classnames('hello ', ' world')
	assert.equal(result, expected)
})

test('should concat strings and conditional objects', () => {
	const expected = 'hello world'
	const result = classnames('hello ', {world: true, extra: false})
	assert.equal(result, expected)
})

test('should concat strings and conditional objects and expressions', () => {
	const expected = 'hello world world-2'
	const result = classnames(
		'hello ',
		{world: true, extra: false},
		true && 'world-2',
		false && 'extra',
	)
	assert.equal(result, expected)
})

test.run()
