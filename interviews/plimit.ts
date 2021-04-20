function plimit(concurrency: number) {
  const queue = [];
  let activeCount = 0;

  const run = async (fn: Function, resolve: Function, args: any[]) => {
    activeCount++;

    try {
      const result = await Promise.resolve().then(() => fn(...args));
      resolve(result);
    } catch {}

    activeCount--;

    if (queue.length > 0) {
      queue.pop()();
    }
  };

  const enqueue = (fn: Function, resolve: Function, args: any[]) => {
    queue.unshift(run.bind(null, fn, resolve, args));

    Promise.resolve().then(() => {
      if (activeCount < concurrency && queue.length) {
        queue.pop()();
      }
    });
  };

  const generator = (fn: Function, ...args: any[]) =>
    new Promise((resolve) => {
      enqueue(fn, resolve, args);
    });

  return generator;
}
