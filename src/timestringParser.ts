import parse from 'date-fns/parse'

export interface TimestringParserOptions {
	refDate?: Date
	formats?: string[]
}

/**
 * Parse simple timestrings into date objects based on general formats
 *
 * **NOTE: Depends on `date-fns`, you'll need to install date-fns**
 *
 * #### Example
 *
 *
 * ```js
 * import timestringParser from "@barelyhuman/useless/timestringParser"
 *
 * timestringParser("00:50:00") //=> 2022-04-14T19:20:00.000Z
 * timestringParser("00:50:00+0530") //=> 2022-04-14T19:20:00.000Z
 * timestringParser("00:50:00+0530") //=> 2022-04-14T19:20:00.000Z
 * timestringParser('00:50:00+05:30') //=> 2022-04-14T19:20:00.000Z
 * ```
 *
 * If you wish to use a different date or pass in different formats to parse
 *
 * ```js
 * timestringParser('00:50:00+05:30',{
 * 	refDate: new Date(new Date().setDate(1)),
 * 	formats:["HH:mm:ssxxx"]
 * })
 * ```
 */
export default function timestringParser(
	timestring: string,
	options?: TimestringParserOptions,
) {
	const {
		refDate = new Date(),
		formats = ['HH:mm:ss', 'HH:mm:ssx', 'HH:mm:ssxxx'],
	} = options || {}

	let validDate
	for (const format of formats) {
		try {
			const val = parse(timestring, format, new Date(refDate))
			if (String(val).startsWith('Invalid Date')) continue

			validDate = val
			break
		} catch (err) {
			continue
		}
	}
	return validDate || 'Invalid Date'
}
