/*
 * @lc app=leetcode.cn id=871 lang=javascript
 *
 * [871] 最低加油次数
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
var minRefuelStops = function (target, startFuel, stations) {
  const heap = createHeap((a, b) => b - a);

  let ans = 0;
  let runned = 0;
  let fuel = startFuel;

  let i = 0;
  // 没到终点站的时候继续循环
  while (runned + fuel < target) {
    let pos = target;
    let capacity = 0;

    // 获取每一站的位置与油量
    if (i < stations.length && stations[i][0] < target) {
      pos = stations[i][0];
      capacity = stations[i][1];
    }

    // 当没油到达下一站时
    while (runned + fuel < pos) {
      if (heap.isEmpty()) return -1;

      // 加最多的油
      const maxFuel = heap.pop();
      fuel += maxFuel;
      ans++;
    }

    // 到达下一站
    fuel = fuel - (pos - runned);
    runned = pos;

    if (capacity > 0) heap.push(capacity);

    i++;
  }

  return runned + fuel >= target ? ans : -1;
};

function createHeap(compareValue) {
  const data = [];

  function swim(i) {
    let par = 0;
    const t = data[i];

    while (i > 0) {
      par = Math.floor((i - 1) / 2);

      if (compareValue(data[par], t) < 0) break;

      data[i] = data[par];
      i = par;
    }

    data[i] = t;
  }

  function sink(i) {
    let j = 0;
    const t = data[i];

    while ((j = i * 2 + 1) < data.length) {
      if (j < data.length - 1 && compareValue(data[j], data[j + 1]) > 0) {
        j++;
      }

      if (compareValue(t, data[j]) < 0) break;

      data[i] = data[j];
      i = j;
    }

    data[i] = t;
  }

  const push = (value) => {
    data.push(value);
    swim(data.length - 1);
  };
  const pop = () => {
    if (data.length === 0) return;

    const retVal = data[0];
    data[0] = data[data.length - 1];
    data.length = data.length - 1;
    if (data.length > 1) sink(0);

    return retVal;
  };
  const peek = () => {
    return data[0];
  };

  const isEmpty = () => {
    return data.length === 0;
  };

  return {
    data,
    push,
    pop,
    peek,
    isEmpty,
  };
}
// @lc code=end
