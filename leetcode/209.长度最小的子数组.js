/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
// var minSubArrayLen = function (target, nums) {
//   let ans = Infinity;
//   let sum = 0;
//   let lo = 0;
//   let hi = 0;

//   while (hi < nums.length) {
//     sum += nums[hi++];

//     while (sum >= target) {
//       ans = Math.min(ans, hi - lo);
//       sum -= nums[lo++];
//     }
//   }

//   return ans === Infinity ? 0 : ans;
// };
var minSubArrayLen = function (target, nums) {
  let ans = Infinity;
  let left = -1;
  let total = 0;

  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];

    total += cur;

    while (total >= target) {
      left++;
      total -= nums[left];

      ans = Math.min(ans, i - left);
    }
  }

  return ans === Infinity ? 0 : ans;
};
// @lc code=end
