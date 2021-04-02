/*
 * @lc app=leetcode.cn id=154 lang=javascript
 *
 * [154] 寻找旋转排序数组中的最小值 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  if (nums.length === 0) return null;

  let left = 0;
  let right = nums.length - 1; // 使用闭区间

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === nums[right]) {
      right--;
    } else if (nums[right] < nums[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
};
// @lc code=end
