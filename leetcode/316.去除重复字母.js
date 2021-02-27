/*
 * @lc app=leetcode.cn id=316 lang=javascript
 *
 * [316] 去除重复字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  let str = '';
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (stack.includes(s[i])) continue;

    stack.push(s[i]);
  }

  return str;
};
// @lc code=end
