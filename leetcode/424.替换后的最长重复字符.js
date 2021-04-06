/*
 * @lc app=leetcode.cn id=424 lang=javascript
 *
 * [424] 替换后的最长重复字符
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  const len = s.length;

  let ans = 0;
  let left = -1;
  let maxCharCount = 0;
  const window = {};

  for (let i = 0; i < len; i++) {
    const char = s[i];
    window[char] = window[char] ? window[char] + 1 : 1;

    // 选出个数多的字符
    // 只有当前的字符才有可能增加个数
    maxCharCount = Math.max(window[char], maxCharCount);

    while (i - left - maxCharCount > k) {
      left++;
      window[s[left]]--;
    }

    ans = Math.max(ans, i - left);
  }

  return ans;
};
// @lc code=end
