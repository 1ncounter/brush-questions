/*
 * @lc app=leetcode.cn id=90 lang=javascript
 *
 * [90] 子集 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  const ans = [];

  nums.sort();

  function backtrack(A, i, path, ans) {
    ans.push([...path]);

    if (i === A.length) return;

    for (let j = i; j < A.length; j++) {
      if (j > i && A[j] === A[j - 1]) continue;

      path.push(A[j]);
      backtrack(A, j + 1, path, ans);
      path.pop();
    }
  }

  backtrack(nums, 0, [], ans);

  return ans;
};
// @lc code=end
