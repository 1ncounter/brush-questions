function debounce(fn: Function, wait: number) {
  let timerId: number = null;
  let lastArgs: any[];
  let lastThis: any;
  let result: any;

  return function debounced(...args: any[]) {
    lastArgs = args;
    lastThis = this;

    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = undefined;
      result = fn.apply(lastThis, lastArgs);
    }, wait);

    return result;
  };
}
