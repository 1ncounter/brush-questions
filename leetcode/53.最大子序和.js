/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 0) return 0;

  let max = nums[0];
  let last = 0;

  // const dp = [];
  // dp[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // dp[i] = Math.max(nums[i], last + nums[i]);
    const temp = Math.max(nums[i], last + nums[i]);
    last = temp;
    max = Math.max(temp, max);
  }

  // return Math.max(...dp);
  return max;
};
// @lc code=end
