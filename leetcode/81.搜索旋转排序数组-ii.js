/*
 * @lc app=leetcode.cn id=81 lang=javascript
 *
 * [81] 搜索旋转排序数组 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
  if (nums.length === 0) return false;

  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[left] === target) return true;
    if (nums[right - 1] === target) return true;
    if (nums[mid] === target) return true;

    if (nums[left] === nums[mid]) {
      left++;
    } else if (nums[mid] > nums[left]) {
      if (nums[left] < target && target < nums[mid]) {
        right = mid;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target < nums[right - 1]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
  }

  return false;
};
// @lc code=end
