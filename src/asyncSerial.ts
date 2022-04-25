type MapFunction<T> = (value: T, index: number, source: T[]) => Promise<unknown>

type Options = {
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
