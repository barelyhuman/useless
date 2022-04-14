type Operation = (data?: any) => Promise<any>;

export default async function asyncPipe(...args: Operation[]) {
  try {
    const mappedResults = [];
    // create a sequential chain of operations
    await args.reduce((chain, operation: Operation) => {
      return chain
        .then((prevData?: any) => {
          // take in the previous data and pass it down
          return operation(prevData);
        })
        .then((opData) => {
          // push data into overall sequential result and
          // return to the next possible operation
          mappedResults.push(opData);
          return opData;
        });
    }, Promise.resolve());
    return mappedResults;
  } catch (err) {
    return false;
  }
}
