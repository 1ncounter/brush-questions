/*
 * @lc app=leetcode.cn id=1642 lang=javascript
 *
 * [1642] 可以到达的最远建筑
 */

// @lc code=start
/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
var furthestBuilding = function (heights, bricks, ladders) {
  let lastPos = 0;
  let preHeight = heights[0];
  let qSum = 0;

  const heap = createHeap((a, b) => b - a);

  for (let i = 1; i < heights.length; i++) {
    const curHeight = heights[i];

    if (preHeight > curHeight) {
      lastPos = i;
    } else {
      const delta = curHeight - preHeight;

      heap.push(delta);
      qSum += delta;

      while (qSum > bricks && ladders > 0) {
        qSum -= heap.pop();
        ladders--;
      }

      if (qSum > bricks) break;

      lastPos = i;
    }

    preHeight = curHeight;
  }

  return lastPos;
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

  const isEmpty = () => {
    return data.length === 0;
  };

  return {
    data,
    push,
    pop,
    isEmpty,
  };
}
// @lc code=end
