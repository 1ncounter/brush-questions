/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  if (nums.length === 0) return [];

  const ans = [];
  const path = [];

  function backtrack(nums, start, path, ans) {
    if (start > nums.length) return;

    ans.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(nums, i + 1, path, ans);
      path.pop();
    }
  }

  backtrack(nums, 0, path, ans);

  return ans;
};
// @lc code=end
