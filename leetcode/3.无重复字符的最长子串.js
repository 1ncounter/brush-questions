/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let window = {};

  let left = 0;
  let right = 0;
  let max = 0;

  while (right < s.length) {
    const c = s[right];
    right++;

    // 进行窗口内数据的一系列更新
    window[c] = window[c] ? window[c] + 1 : 1;

    // 判断左侧窗口是否要收缩
    while (window[c] > 1) {
      const d = s[left];
      left++;
      // 进行窗口内数据的一系列更新
      window[d]--;
    }

    max = Math.max(max, right - left);
  }

  return max;
};
// @lc code=end
