/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  const kmp = new KMP(needle);

  return kmp.search(haystack);
};

/**
 * https://labuladong.gitee.io/algo/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%B3%BB%E5%88%97/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E4%B9%8BKMP%E5%AD%97%E7%AC%A6%E5%8C%B9%E9%85%8D%E7%AE%97%E6%B3%95.html
 */
class KMP {
  pattern = '';
  dp = [];

  constructor(pattern) {
    this.pattern = pattern;
    this.dp = new Array(pattern.length).fill({});
    
  }

  search(text) {
    const M = this.pattern.length;
    const N = text.length;

    if (N === 0) return 0;

    let j = 0;

    for (let i = 0; i < N; i++) {
      // 当前是状态 j，遇到字符 txt[i]，
      // pat 应该转移到哪个状态？
      j = this.dp[j][text.charAt(i)]

      // 如果达到终止态，返回匹配开头的索引
      if (j === M) return i - M + 1;
    }

    return -1;
  }
}
// @lc code=end

