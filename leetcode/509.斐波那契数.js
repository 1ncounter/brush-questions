/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (n === 2) return 1;
  if (n === 3) return 2;

  // const dp = [];

  // dp[0] = 0;
  // dp[1] = 1;
  // dp[2] = 1;

  // for (let i = 3; i <= n; i++) {
  //   dp[i] = dp[i - 1] + dp[i - 2];
  // }

  // return dp[n];

  let prev = 1;
  let curr = 1;

  for (let i = 3; i <= n; i++) {
    const sum = prev + curr;
    prev = curr;
    curr = sum;
  }

  return curr;
};
// @lc code=end
