function throttle(fn: Function, wait: number) {
  let lastInvokeTime: number;
  let lastArgs: any[];
  let result: any;

  return function throttled(...args: any[]) {
    const time = Date.now();

    lastArgs = args;

    if (!lastInvokeTime || time - lastInvokeTime > wait) {
      lastInvokeTime = time;
      result = fn.apply(null, lastArgs);
    }

    return result;
  };
}
