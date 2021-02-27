/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为K的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const mp = new Map();

  mp.set(0, 1);

  let count = 0;
  let preSum = 0;

  for (const x of nums) {
    preSum += x;

    if (mp.has(preSum - k)) {
      count += mp.get(preSum - k);
    }

    if (mp.has(preSum)) {
      mp.set(preSum, mp.get(preSum) + 1);
    } else {
      mp.set(preSum, 1);
    }
  }

  return count;
};
// @lc code=end
