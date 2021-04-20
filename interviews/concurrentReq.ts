function concurrentReq(fns: Function[] | Promise<any>[], limit: number) {
  if (fns.length === 0) return [];

  let activeCount = 0;
  let count = 0;
  const result = [];
  const queue = [];

  return new Promise((resolve) => {
    function runWrapper(fn: Function | Promise<any>, idx: number) {
      return async () => {
        activeCount++;
        let res: any;

        if (typeof fn === 'function') {
          res = await fn();
        } else {
          res = await Promise.resolve(fn);
        }

        result[idx] = res;
        count++;
        if (count === fns.length) {
          resolve(result);
        }

        activeCount--;
        if (queue.length > 0) {
          const fn = queue.pop();
          fn();
        }
      };
    }

    for (let i = 0; i < fns.length; i++) {
      const runner = runWrapper(fns[i], i);

      if (activeCount >= limit) {
        queue.unshift(runner);
      } else {
        runner();
      }
    }
  });
}

function delay(time: number) {
  return (fn: Function) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(fn()), time);
    });
}

function random() {
  return Math.floor(Math.random() * 1500) + 500;
}

void (async () => {
  const list = [1, 2, 3, 4, 5, 6];

  const fns = list.map((i) => delay(random())(() => i));

  const ans = await concurrentReq(fns, 3);

  console.log(ans);
})();
