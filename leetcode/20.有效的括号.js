/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2 > 0) return false;

  const stack = [];
  const stringArr = s.split('');

  while (stringArr.length) {
    const char = stringArr.shift();

    if (['(', '{', '['].includes(char)) {
      stack.push(char);
    } else {
      const item = stack[stack.length - 1];

      if (
        (char === ')' && item === '(') ||
        (char === '}' && item === '{') ||
        (char === ']' && item === '[')
      ) {
        if (stack.length > 0) {
          stack.pop();
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
};
// @lc code=end
