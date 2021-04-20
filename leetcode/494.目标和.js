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
  // if (nums.length === 0) return 0;

  // // 回溯法
  // let result = 0;

  // function backtrack(sum, nums, i) {
  //   if (nums.length === i) {
  //     if (sum === 0) result++;
  //     return;
  //   }

  //   sum = sum + nums[i];
  //   backtrack(sum, nums, i + 1);
  //   sum = sum - nums[i];

  //   sum = sum - nums[i];
  //   backtrack(sum, nums, i + 1);
  //   sum = sum + nums[i];
  // }

  // backtrack(S, nums, 0);

  // return result;

  const N = nums.length;

  if (N === 0) return 0;

  const sum = nums.reduce((p, c) => p + c, 0);

  if (sum < Math.abs(S)) return 0;

  // 先将本问题转换为01背包问题。
  // 假设所有符号为+的元素和为x，符号为-的元素和的绝对值是y。
  // 我们想要的 S = 正数和 - 负数和 = x - y => x = S + y
  // 而已知x与y的和是数组总和：x + y = sum => x = sum - y
  // 可以求出 x = (S + sum) / 2

  const X = (S + sum) >> 1;

  const dp = new Array(X + 1).fill(0);

  // 一开始肯定是只有一种的，也就是什么元素都不选
  dp[0] = 1;

  for (const num of nums) {
    for (let i = X; i >= num; i--) {
      dp[i] = dp[i] + dp[i - num];
    }
  }

  return dp[X];
};
// @lc code=end
