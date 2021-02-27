/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (n === 0) return [];

  const result = [];

  function backtrack(track, left, right) {
    if (track.length === n * 2) {
      result.push([...track].join(''));
      return;
    }

    if (left < n) {
      track.push('(');
      backtrack(track, left + 1, right);
      track.pop();
    }

    if (left > right) {
      track.push(')');
      backtrack(track, left, right + 1);
      track.pop();
    }
  }

  backtrack([], 0, 0);

  return result;
};
// @lc code=end
