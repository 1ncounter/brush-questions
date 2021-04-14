/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const ans = [];
  if (nums.length === 0) return ans;

  const used = new Array(nums.length).fill(0);

  function backtrack(A, i, path, ans) {
    if (i === A.length) {
      ans.push([...path]);
      return;
    }

    for (let j = 0; j < A.length; j++) {
      if (used[j]) continue;
      if (!used[j - 1] && j > 0 && A[j] === A[j - 1]) continue;

      path.push(A[j]);
      used[j] = 1;
      backtrack(A, i + 1, path, ans);
      used[j] = 0;
      path.pop();
    }
  }

  nums.sort((a, b) => a - b);
  backtrack(nums, 0, [], ans);

  return ans;
};
// @lc code=end
