/*
 * @lc app=leetcode.cn id=91 lang=javascript
 *
 * [91] 解码方法
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  const len = s.length;

  if (len === 0) return 0;
  if (s[0] === '0') return 0;

  const dp = new Array(len).fill(0);
  dp[0] = 1;

  for (let i = 0; i < len; i++) {
    // 边界1 : 当前字母为0, dp[i] = dp[i-1]
    // 边界2 : 当前不为0, 但是与上一个字母组成的数字无法解码, dp[i] = dp[i-2]
    dp[i + 1] = s[i] === '0' ? 0 : dp[i];

    // dp[i] = dp[i-1] + dp[i-2]
    if (
      i > 0 &&
      (s[i - 1] === '1' || (s[i - 1] === '2' && s[i].charCodeAt() <= '6'.charCodeAt()))
    ) {
      dp[i + 1] += dp[i - 1];
    }
  }

  return dp[len];
};
// @lc code=end
