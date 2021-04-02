/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const ans = [-1, -1];

  if (nums.length === 0) return ans;

  const left = binarySearch(nums, target);

  if (nums[left] === target) {
    const right = binarySearch(nums, target + 1);

    return [left, right - 1];
  } else {
    return ans;
  }
};

function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
// @lc code=end
