function curryN(length: number, received: any[], fn: Function) {
  return function (...args: any[]) {
    const combined = received.concat(args);
    const left = length - combined.length;

    return left <= 0 ? fn.apply(null, combined) : curryN(length, combined, fn);
  };
}

function curry(fn: Function) {
  return curryN(fn.length, [], fn);
}
