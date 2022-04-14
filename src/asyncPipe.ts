type Operation = (data?: any) => Promise<any>;

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
