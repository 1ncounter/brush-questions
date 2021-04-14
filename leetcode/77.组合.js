/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  if (n === 0) return [];

  const result = [];
  const path = [];

  function backtrack(begin) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    for (let i = begin; i <= n; i++) {
      if (path.includes(i)) continue;

      path.push(i);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(1);

  return result;
};
// @lc code=end
