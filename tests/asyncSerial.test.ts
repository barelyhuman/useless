import asyncSerial from '../src/asyncSerial'
import {test} from 'uvu'
import * as assert from 'uvu/assert'

const data = [
	{
		value: 1,
	},
	{
		value: 2,
	},
	{
		value: 3,
	},
]

function getData(item: {value: number}) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(item)
		}, 2500)
	})
}

test('conch | limit 1', async () => {
	let now = Date.now()
	await asyncSerial(data, item => getData(item), {limit: 1})
	let end = Date.now()
	const diff = end - now
	const baseMS = 2500 * 3
	assert.ok(diff >= baseMS || diff <= baseMS + 100)
})

test('conch | no limit', async () => {
	let now = Date.now()
	await asyncSerial(data, getData)
	let end = Date.now()
	const diff = end - now
	assert.ok(diff >= 2500 || diff <= 2600)
})

test.run()
