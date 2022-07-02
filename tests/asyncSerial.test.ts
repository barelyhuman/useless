import { test } from 'uvu'
import * as assert from 'uvu/assert'

import asyncSerial from '../src/asyncSerial'

const data = [
  {
    item: 1,
  },
  {
    item: 2,
  },
  {
    item: 3,
  },
]

function getData(item) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(item)
    }, 2500)
  })
}

test('should take a set amount of time with limit 1', async () => {
  const now = Date.now()
  const result = await asyncSerial(data, getData, { limit: 1 })
  const end = Date.now()
  const diff = end - now
  const baseMS = 2500 * 3
  assert.ok(diff >= baseMS && diff <= baseMS + 100)
  assert.equal(result, data)
})

test('should take the overall time of Promise.all', async () => {
  const now = Date.now()
  const result = await asyncSerial(data, getData)
  const end = Date.now()
  const diff = end - now
  assert.ok(diff >= 2500 && diff <= 2600)
  assert.equal(result, data)
})

test.run()
