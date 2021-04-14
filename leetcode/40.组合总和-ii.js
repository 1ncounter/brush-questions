/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  if (!candidates || !candidates.length) return [];

  candidates.sort();

  const ans = [];
  const path = [];

  function backtrack(A, start, total, path, ans) {
    if (total === target) {
      ans.push([...path]);
    }

    if (total > target) return;

    for (let i = start; i < A.length; i++) {
      // 避免重复的情况
      if (i > start && A[i] == A[i - 1]) {
        continue;
      }

      path.push(A[i]);
      backtrack(A, i + 1, total + A[i], path, ans);
      path.pop();
    }
  }

  backtrack(candidates, 0, 0, path, ans);

  return ans;
};
// @lc code=end
