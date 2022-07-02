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
export default function chunk<T extends Record<string, unknown>>(
  batch: T[],
  perChunkSize: number
) {
  const result = []
  let offset = 0

  while (offset < batch.length) {
    const _cnk = batch.slice(offset * perChunkSize, (offset + 1) * perChunkSize)
    if (_cnk.length === 0) break
    result.push(_cnk)
    offset = offset + 1
  }

  return result
}
