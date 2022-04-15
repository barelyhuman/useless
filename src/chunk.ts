/**
 * Convert a given set of array into an array of the given size
 * #### Example
 * ```js
 * import chunk from "@barleyhuman/useless/chunk"
 *
 * const items = [1,2,3,4,5]
 * chunk(items,2) // => [[1,2],[3,4],[5]]
 * ```
 */
export default function chunk(batch: any[], perChunkSize: number) {
	let result = []
	let _chunk = []

	for (let i = 0; i < batch.length; i++) {
		if (_chunk.length === perChunkSize) {
			result.push(_chunk)
			_chunk = []
		}

		_chunk.push(batch[i])
	}

	if (_chunk.length > 0) result.push(_chunk)
	return result
}
