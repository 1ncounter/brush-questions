/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // const dpTable = {};

  // function dp(n) {
  //   if (dpTable[n]) return dpTable[n];

  //   if (n === 0) return 0;
  //   if (n < 0) return -1;

  //   let res = Infinity;

  //   for (const coin of coins) {
  //     const subproblem = dp(n - coin);
  //     if (subproblem === -1) continue;
  //     res = Math.min(res, subproblem + 1);
  //   }

  //   res = res === Infinity ? -1 : res;
  //   dpTable[n] = res;

  //   return res;
  // }

  // return dp(amount);

  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  for (let i = 0; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin < 0) continue;

      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }

  return dp[amount] === amount + 1 ? -1 : dp[amount];
};
// @lc code=end
