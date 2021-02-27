/*
 * @lc app=leetcode.cn id=983 lang=javascript
 *
 * [983] 最低票价
 */

// @lc code=start
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
  const maxDay = days[days.length - 1];
  const dp = new Array(maxDay + 31).fill(0);

  for (let i = maxDay; i > 0; i--) {
    if (days.includes(i)) {
      dp[i] = Math.min(dp[i + 1] + costs[0], dp[i + 7] + costs[1], dp[i + 30] + costs[2])
    } else {
      dp[i] = dp[i + 1];
    }
  }

  return dp[1];
};
// @lc code=end

