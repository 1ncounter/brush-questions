/*
 * @lc app=leetcode.cn id=373 lang=javascript
 *
 * [373] 查找和最小的K对数字
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
  const N = nums1.length;
  const M = nums2.length;

  if (N === 0 || M === 0 || k === 0) return [];

  const result = [];

  // const heap = createHeap((a, b) => a.i + a.j - b.i - b.j);

  // for (let i = 0; i < N; i++) {
  //   for (let j = 0; j < M; j++) {
  //     heap.push({ i: nums1[i], j: nums2[j] });
  //   }
  // }

  // for (let i = 0; i < k && !heap.isEmpty(); i++) {
  //   const { i, j } = heap.pop();
  //   result.push([i, j]);
  // }

  const heap = createHeap((a, b) => nums1[a.i] + nums2[a.j] - nums1[b.i] - nums2[b.j]);

  for (let i = 0; i < N; i++) {
    heap.push({ i: i, j: 0 });
  }

  for (let i = 0; i < k && !heap.isEmpty(); i++) {
    const { i, j } = heap.pop();
    result.push([nums1[i], nums2[j]]);

    if (j + 1 < M) {
      heap.push({ i, j: j + 1 });
    }
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

var kSmallestPairs = function (nums1, nums2, k) {
  const N = nums1.length;
  const M = nums2.length;

  if (N === 0 || M === 0 || k === 0) return [];

  const result = [];

  const heap = createHeap((a, b) => a.i + a.j - b.i - b.j);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      heap.push({ i: nums1[i], j: nums2[j] });
    }
  }

  for (let i = 0; i < k && !heap.isEmpty(); i++) {
    const { i, j } = heap.pop();
    result.push([i, j]);
  }

  return result;
};
// @lc code=end
