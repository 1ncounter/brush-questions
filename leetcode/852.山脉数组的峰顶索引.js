/*
 * @lc app=leetcode.cn id=852 lang=javascript
 *
 * [852] 山脉数组的峰顶索引
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
  // let ans = 0;

  // for (let i = 1; i < arr.length - 1; i++) {
  //   if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
  //     ans = i;
  //   }
  // }

  // 将原数组映射成为[-1, -1, 0, 1, 1]
  // 从而将问题转换为查找0的左边界
  function getC(i) {
    if (arr[i - 1] > arr[i] && arr[i] > arr[i + 1]) return 1;
    if (arr[i - 1] < arr[i] && arr[i] < arr[i + 1]) return -1;

    return 0;
  }

  let left = 1;
  let right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (getC(mid) < 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
};
// @lc code=end
