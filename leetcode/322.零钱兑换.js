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
  // if (amount === 0) return 0;

  // const dpTable = {};

  // const dfs = (need) => {
  //   if (dpTable[need]) return dpTable[need];

  //   let ans = Infinity;

  //   for (const coin of coins) {
  //     if (need === coin) return 1;

  //     if (need > coin) {
  //       ans = Math.min(ans, dfs(need - coin));
  //     }
  //   }

  //   dpTable[need] = ans;

  //   return ans;
  // };

  // let ans = dfs(amount);

  // return ans === Infinity ? -1 : ans;

  const dp = new Array(amount + 1).fill(Infinity);

  // base case
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      // 正向推导
      // if (i + coin <= amount) {
      //   dp[i + coin] = Math.min(dp[i] + 1, dp[i + coin]);
      // }

      // 反向推导
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};
// @lc code=end
