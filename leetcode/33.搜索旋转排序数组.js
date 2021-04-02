/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[left] === target) return left;
    if (nums[right - 1] === target) return right - 1;
    if (nums[mid] === target) return mid;

    if (nums[left] < nums[mid]) {
      if (nums[left] < target && nums[mid] > target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && nums[right - 1] > target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
  }

  return -1;
};
// @lc code=end
