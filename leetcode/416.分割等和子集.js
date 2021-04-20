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
  const N = nums.length;

  if (N < 2) return false;

  const total = nums.reduce((pre, cur) => pre + cur, 0);

  if (total % 2 > 0) return false;

  const V = total / 2;

  const dp = new Array(V + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    // 反向代表从大到小 数组里面面的数都是正整数 不会被重复减掉的数影响结果
    for (let i = V; i - num >= 0; i--) {
      // dp[i] 代表之前已经成立 dp[n - 1]代表相差num的数成立
      dp[i] = dp[i] || dp[i - num];
    }
  }

  return dp[V];
};
// @lc code=end
