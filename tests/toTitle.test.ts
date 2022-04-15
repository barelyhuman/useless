import {test} from 'uvu'
import * as assert from 'uvu/assert'
import toTitle from '../src/toTitle'

test('should convert snake_case to Title Case', () => {
	const expected = 'Hello World'
	const input = 'hello_world'
	const out = toTitle(input)
	assert.equal(out, expected)
})

test('should convert PascalCase to Title Case', () => {
	const expected = 'Hello World'
	const input = 'HelloWorld'
	const out = toTitle(input)
	assert.equal(out, expected)
})

test('should convert camelCase to Title Case', () => {
	const expected = 'Hello World'
	const input = 'helloWorld'
	const out = toTitle(input)
	assert.equal(out, expected)
})

test('should convert kebab-case to Title Case', () => {
	const expected = 'Hello World'
	const input = 'hello-world'
	const out = toTitle(input)
	assert.equal(out, expected)
})

test('should convert mixed case to Title Case', () => {
	const expected = 'Hello World How Are You'
	const input = 'hello-worldHow_areYou'
	const out = toTitle(input)
	assert.equal(out, expected)
})

test.run()
