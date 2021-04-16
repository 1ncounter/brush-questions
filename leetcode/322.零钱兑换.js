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
  if (amount === 0) return 0;

  const dpTable = {};

  const dfs = (need) => {
    if (dpTable[need]) return dpTable[need];

    let ans = Infinity;

    for (const coin of coins) {
      if (need === coin) return 1;

      if (need > coin) {
        ans = Math.min(ans, dfs(need - coin));
      }
    }

    dpTable[need] = ans;

    return ans;
  };

  let ans = dfs(amount);

  return ans === Infinity ? -1 : ans;

  // const dp = new Array(amount + 1).fill(amount + 1);
  // dp[0] = 0;

  // for (let i = 0; i <= amount; i++) {
  //   for (const coin of coins) {
  //     if (i - coin < 0) continue;

  //     dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
  //   }
  // }

  // return dp[amount] === amount + 1 ? -1 : dp[amount];
};
// @lc code=end
