/**
 * `asyncSerial` is a serial promise execution solution that runs the given mapFunction on
 *  each given item of an iterable(array,array of object, maps, etc)
 *
 * #### Usecase
 *
 * This is generally used for cases where you are working a memory intensive task
 * and running all promises parallely would lead to running out of memory (`Promise.all`)
 * in such cases it's easier to limit the execution context.
 *
 * Unlike [p-map](https://github.com/sindresorhus/p-map), asyncSerial runs the given batch
 * in chunks and not in a windowed fashion. Meaning, `p-map` would make sure there's always
 * a certain amount of promises running thus using a windowed approach, on the other hand
 * asyncSerial uses batches, so it'll pick up the next batch after the first one has completed.
 *
 * There's close to no performance difference in both approaches, just stating the difference
 *
 * #### Example
 *
 *  ```js
 * import asyncSerial from "@barelyhuman/useless/asyncSerial"
 *
 * const batchToProcess = [{userId:1},{userId:2},{userId:3}]
 *
 * function fetchUsersData(){
 *  const userData = await asyncSerial(batchToProcess,async (item)=> {
 * 		return await fetchUserById(item.userId)
 * 	} ,{limit:2})
 *
 *  console.log({userData}) // {userData:[ //....data of each userId ]}
 *
 * }
 * ```
 * @module
 */

export type MapFunction<T> = (
  value: T,
  index: number,
  source: T[]
) => Promise<unknown>

export interface Options {
  limit?: number
}

export default function asyncSerial<T>(
  iterable: Array<T>,
  mapFunc: MapFunction<T>,
  options: Options = { limit: Infinity }
) {
  let resolved = []
  let limit = options.limit
  let offset = 0
  let chain = Promise.resolve()

  if (!(iterable instanceof Array))
    throw new Error('[conch] the input needs to be an array of items')

  if (isNaN(options.limit))
    throw new Error('[conch] limit needs to be a number')

  if (options.limit === Infinity || options.limit === 0) limit = iterable.length

  while (offset < iterable.length) {
    const batch = iterable.slice(offset * limit, (offset + 1) * limit)
    if (batch.length === 0) break
    offset = offset + 1
    chain = chain
      .then(() => Promise.all(batch.map(mapFunc)))
      .then(d => {
        resolved = resolved.concat(d)
      })
  }

  return chain.then(() => resolved)
}
