/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = {};
  const result = [];

  for (const num of nums) {
    if (!map[num]) map[num] = 0;
    map[num]++;
  }

  const heap = createHeap();

  for (const [num, count] of Object.entries(map)) {
    heap.push({ num, count });
  }

  for (let i = 0; i < k; i++) {
    result.push(Number(heap.pop().num));
  }

  return result;
};

const createHeap = () => {
  const data = [];

  function swim(i) {
    let par = 0;
    const t = data[i];

    while (i > 0) {
      par = Math.floor((i - 1) / 2);

      if (data[par].count > t.count) break;

      data[i] = data[par];
      i = par;
    }

    data[i] = t;
  }

  function sink(i) {
    let j = 0;
    const t = data[i];

    while ((j = i * 2 + 1) < data.length) {
      if (j < data.length - 1 && data[j].count < data[j + 1].count) {
        j++;
      }

      if (data[j].count < t.count) break;

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
    const retVal = data[0];
    data[0] = data[data.length - 1];
    data.length = data.length - 1;
    sink(0);

    return retVal;
  };

  return {
    push,
    pop,
  };
};
// @lc code=end
