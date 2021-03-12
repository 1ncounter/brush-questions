/*
 * @lc app=leetcode.cn id=1705 lang=javascript
 *
 * [1705] 吃苹果的最大数目
 */

// @lc code=start
/**
 * @param {number[]} apples
 * @param {number[]} days
 * @return {number}
 */
var eatenApples = function (apples, days) {
  const len = apples.length;
  let ans = 0;
  let i = 0;

  const heap = createHeap((a, b) => a.expired - b.expired);

  while (i < len || !heap.isEmpty()) {
    if (i < len) {
      heap.push({ nums: apples[i], expired: i + days[i] });
    }

    while (!heap.isEmpty() && heap.peek().expired <= i) {
      heap.pop();
    }

    if (!heap.isEmpty()) {
      const current = heap.pop();
      ans++;
      if (current.nums - 1 > 0) heap.push({ ...current, nums: current.nums - 1 });
    }

    i++;
  }

  return ans;
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
