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

  const result = [];

  function backtrack(track, start) {
    result.push([...track]);
    if (track.length === nums.length) return;

    for (let i = start; i < nums.length; i++) {
      track.push(nums[i]);
      backtrack(track, i + 1);
      track.pop();
    }
  }

  backtrack([], 0);

  return result;
};
// @lc code=end
