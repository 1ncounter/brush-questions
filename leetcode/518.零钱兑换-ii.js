/*
 * @lc app=leetcode.cn id=518 lang=javascript
 *
 * [518] 零钱兑换 II
 */

// @lc code=start
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const dp = [];

  /**
   * base case
   *   0 1 2 5
   * 0 0 1 1 1
   * 1 0
   * 2 0
   * 3 0
   * 4 0
   * 5 0
   */
  // for (let i = 0; i <= coins.length; i++) {
  //   if (!dp[i]) dp[i] = [];
  //   dp[i][0] = 0;
  // }
  // for (let j = 1; j <= amount; j++) {
  //   dp[0][j] = 1;
  // }

  // 若只使用 coins 中的前 i 个硬币的面值，若想凑出金额 j，有 dp[i][j] 种凑法。
  // for (let i = 1; i <= coins.length; i++) {
  //   for (let j = 1; j <= amount; j++) {
  //     if (j - coins[i - 1] >= 0) {
  //       dp[i][j] = dp[i - 1][j] + dp[i - 1][j - coins[i - 1]];
  //     } else {
  //       dp[i][j] = dp[i - 1][j];
  //     }
  //   }
  // }

  /* ------------状态压缩----------- */

  dp[0] = 1;
  for (let i = 1; i < amount + 1; i++) {
    dp[i] = 0;
  }

  for (let i = 0; i < coins.length; i++) {
    for (let j = 1; j <= amount; j++) {
      if (j - coins[i] >= 0) {
        dp[j] = dp[j] + dp[j - coins[i]];
      }
    }
  }

  return dp[amount];
};
// @lc code=end
