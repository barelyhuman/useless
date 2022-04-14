type Operation = (data?: any) => Promise<any>;

/**
 * #### Example
 * ```js
 * import asyncPipe from "@barelyhuman/useless/asyncPipe";
 *
 * const profileDetails = await asyncPipe(
 *  async function getProfile(){
 *    return await getProfileFromAPI(id)
 *  },
 *  async function combineName(){
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
        return operation(prevData);
      })
      .then((opData) => {
        // return to the next possible operation
        return opData;
      });
  }, Promise.resolve());
}
