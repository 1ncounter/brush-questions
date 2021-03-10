/*
 * @lc app=leetcode.cn id=973 lang=javascript
 *
 * [973] 最接近原点的 K 个点
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {
  const result = [];
  const heap = createHeap((a, b) => {
    return b.distance - a.distance;
  });

  for (const point of points) {
    const [num1, num2] = point;
    const distance = Math.sqrt(Math.pow(num1, 2) + Math.pow(num2, 2));

    heap.push({ point, distance });
  }

  for (let i = 0; i < k; i++) {
    result.push(heap.pop().point);
  }

  return result;
};

function createHeap(compareValue) {
  const data = [];

  function swim(i) {
    let par = 0;
    const t = data[i];

    while (i > 0) {
      par = Math.floor((i - 1) / 2);

      if (compareValue(data[par], t) > 0) break;

      data[i] = data[par];
      i = par;
    }

    data[i] = t;
  }

  function sink(i) {
    let j = 0;
    const t = data[i];

    while ((j = i * 2 + 1) < data.length) {
      if (j < data.length - 1 && compareValue(data[j], data[j + 1]) < 0) {
        j++;
      }

      if (compareValue(t, data[j]) > 0) break;

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
    data,
    push,
    pop,
  };
}
// @lc code=end
