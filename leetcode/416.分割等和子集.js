/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const len = nums.length;

  if (len < 2) return false;

  const sum = nums.reduce((prev, cur) => prev + cur, 0);

  if (sum % 2 !== 0) return false;

  const target = sum / 2;
  const dp = [];

  dp[0] = true;

  for (let i = 1; i <= len; i++) {
    for (let j = target; j >= 0; j--) {
      if (j - nums[i - 1] >= 0) {
        dp[j] = Boolean(dp[j] || dp[j - nums[i - 1]]);
      }
    }
  }

  return dp[target];
};
// @lc code=end
