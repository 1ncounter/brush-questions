/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const ans = [];
  const path = [];

  function backtrack(A, start, total, path, ans) {
    if (total === target) {
      ans.push([...path]);
    }
    if (total > target) return;

    for (let i = start; i < A.length; i++) {
      path.push(A[i]);
      backtrack(A, i, total + A[i], path, ans);
      path.pop();
    }
  }

  backtrack(candidates, 0, 0, path, ans);

  return ans;
};
// @lc code=end
