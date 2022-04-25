/**
 * `asyncPipe` is a pipe styled utility but with a slight difference from
 * the pipe functions you have in functional languages
 *
 * The source of the pipe is always a promise and the data is then passed
 * like you were writing a promise chain, just that it's easier to compose
 * functions like this.
 *
 * Your next function always gets data from the previous one so make sure you write
 * the helper functions with that in mind
 *
 * @module
 */

export type Operation = (data?: any) => Promise<any>

/**
 * #### Example
 * ```js
 * import asyncPipe from "@barelyhuman/useless/asyncPipe";
 *
 * const profileDetails = await asyncPipe(
 *  async function getProfile(){
 *    return await getProfileFromAPI(id)
 *  },
 *  async function combineName(data){
 *    // combine 2 fields where one can be null
 *    data.fullName = [data.firstName,data.lastName].filter(x=>x).join(" ");
 *    return data
 *  }
 * )
 * ```
 */
export default async function asyncPipe(...args: Operation[]) {
	return await args.reduce((chain, operation: Operation) => {
		return chain
			.then((prevData?: any) => {
				// take in the previous data and pass it down
				return operation(prevData)
			})
			.then(opData => {
				// return to the next possible operation
				return opData
			})
	}, Promise.resolve())
}
