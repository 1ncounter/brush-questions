/**
 * 最大并发数 / JS限流调度器
 */
function random() {
  return Math.floor(Math.random() * 1500) + 500;
}

function delay(i) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(i), random());
    });
}

function concurrentReq(list, limit) {
  if (list.length === 0) return [];

  const fns = list.map((i) => delay(i));

  let activeCount = 0;
  const result = [];
  const queue = [];

  return new Promise((resolve) => {
    function runWrapper(fn, idx) {
      return async () => {
        activeCount++;
        const res = await fn();
        result[idx] = res;

        if (result.length === list.length) {
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
      const fn = runWrapper(fns[i], i);

      if (activeCount >= limit) {
        queue.unshift(fn);
      } else {
        fn();
      }
    }
  });
}
