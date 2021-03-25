/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  if (nums.length <= 1) return nums;

  const swap = (nums, l, r) => {
    const temp = nums[l];
    nums[l] = nums[r];
    nums[r] = temp;
  };

  const white = 1;
  let i = 0;
  let l = 0;
  let r = nums.length - 1;

  while (i <= r) {
    if (nums[i] < white) {
      swap(nums, l++, i++);
    } else if (nums[i] === white) {
      i++;
    } else {
      swap(nums, r--, i);
    }
  }
};
// @lc code=end
