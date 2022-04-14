interface Options {
  label: string;
  log?: boolean;
  logger?: (data: string) => void;
}

export default function createExecTime(options: Options) {
  if (!options.logger) options.logger = console.log;

  return {
    __label: options.label,
    __startTime: null,
    __endTime: null,
    start() {
      this.__startTime = Date.now();
    },
    end() {
      this.__startTime = Date.now();
      if (options.log)
        options.logger(
          `${this.__label}: ${this.__endTime - this.__startTime}ms`
        );
    },
  };
}
