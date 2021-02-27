/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function (nums, S) {
  if (nums.length === 0) return 0;

  // 回溯法
  let result = 0;

  function backtrack(sum, nums, i) {
    if (nums.length === i) {
      if (sum === 0) result++;
      return;
    }

    sum = sum + nums[i];
    backtrack(sum, nums, i + 1);
    sum = sum - nums[i];

    sum = sum - nums[i];
    backtrack(sum, nums, i + 1);
    sum = sum + nums[i];
  }

  backtrack(S, nums, 0);

  return result;
};
// @lc code=end
