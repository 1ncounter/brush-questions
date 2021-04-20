/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // 环状排列意味着第一个房子和最后一个房子中只能选择一个偷窃，
  // 因此可以把此环状排列房间问题约化为两个单排排列房间子问题：
  // 我们需要考虑两种情况，
  // - A[0]不抢: [1...N)
  // - A[0]必然抢: 接下来只需要处理[2...N-1)
  // 那么原来的数组，实际上就变成了两个数组
  const N = nums.length;

  return Math.max(robHouse(nums, 1, N), nums[0] + robHouse(nums, 2, N - 1));
};

function robHouse(nums, start, end) {
  if (start >= end) return 0;

  if (end - start === 1) return nums[start];

  const dp = new Array(end);
  dp[start] = nums[start];
  dp[start + 1] = Math.max(dp[start], nums[start + 1]);

  for (let i = start + 2; i < end; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[end - 1];
}
// @lc code=end
