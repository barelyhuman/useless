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
	source: T[],
) => Promise<unknown>

export interface Options {
	limit?: number
}

export default function asyncSerial<T extends any>(
	iterable: Iterable<T>,
	mapFunc: MapFunction<T>,
	options: Options = {limit: Infinity},
) {
	return new Promise((resolve, reject) => {
		let result = []
		const limit = options.limit
		const iterator = [...iterable]

		// Check for limit to be a valid number and not less that 1
		if (isNaN(limit) || limit < 1) {
			throw new Error(
				'Invalid number returned for limit, make sure its a number and is greater than 1',
			)
		}

		// store the total number of chunks to be created for the provided limit
		let totalChunks = 1

		if (limit >= 1 && limit !== Infinity) {
			totalChunks = Math.ceil(iterator.length / limit)
		}

		// Create an array out of the total batches
		;[...Array(totalChunks).keys()]

			// go through each item while slicing it into batches and processing a single batch
			// then create a promise chain resolving one batch after the other
			.reduce((acc, _, index) => {
				const batch = iterator.slice(index * limit, (index + 1) * limit)

				return acc
					.then(() => Promise.all(batch.map(mapFunc)))
					.then(data => {
						result = result.concat(data)
					})
					.catch(reject)
			}, Promise.resolve())

			// return the completed result
			.then(_ => resolve(result))
	})
}
