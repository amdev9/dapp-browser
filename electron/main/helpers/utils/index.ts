export const EXEC_TIMEOUT = 10000;

export const functionPromiseTimeout = (f: () => Promise<any>, timeout: number = EXEC_TIMEOUT): any => {
  if (!(f instanceof Function)) {
    throw Error('First argument is not a function');
  }

  return new Promise((resolve, reject) => {
    const result = f();

    if (!(result instanceof Promise)) {
      return result;
    }

    const timerId = setTimeout(() => {
      reject('Timeout error');
    }, timeout);

    result
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timerId));
  });
};
