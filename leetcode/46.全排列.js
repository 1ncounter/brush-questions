/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  if (nums.length === 0) return [];

  const paths = [];

  function backtrack(nums, track) {
    if (nums.length === track.length) {
      paths.push([...track]);
      return;
    }

    for (const num of nums) {
      // 已经有了
      if (track.includes(num)) continue;

      track.push(num);
      backtrack(nums, track);
      track.pop();
    }
  }

  backtrack(nums, []);

  return paths;
};
// @lc code=end
