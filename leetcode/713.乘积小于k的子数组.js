/*
 * @lc app=leetcode.cn id=713 lang=javascript
 *
 * [713] 乘积小于K的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  let ans = 0;
  let product = 1;
  let left = -1;

  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];

    product = product * cur;

    while (product >= k && left < i) {
      left++;
      product = product / nums[left];
    }

    ans += i - left;
  }

  return ans;
};
// @lc code=end
