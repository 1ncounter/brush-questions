/*
 * @lc app=leetcode.cn id=474 lang=javascript
 *
 * [474] 一和零
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  const N = strs.length;

  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  dp[0][0] = 0;

  for (const str of strs) {
    const cnt = countZeroAndOne(str);

    for (let i = m; i >= cnt[0]; i--) {
      for (let j = n; j >= cnt[1]; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - cnt[0]][j - cnt[1]] + 1);
      }
    }
  }

  return dp[m][n];
};

function countZeroAndOne(str) {
  const cnt = [0, 0];
  for (let i = 0; i < str.length; i++) {
    cnt[str[i] - '0']++;
  }
  return cnt;
}
// @lc code=end
