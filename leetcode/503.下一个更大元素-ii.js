/*
 * @lc app=leetcode.cn id=503 lang=javascript
 *
 * [503] 下一个更大元素 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const res = [];
  const stack = [];

  for (let i = nums.length * 2 - 1; i >= 0; i--) {
    const index = i % nums.length;

    while (stack.length && stack[stack.length - 1] <= nums[index]) {
      stack.pop();
    }

    res[index] = stack.length ? stack[stack.length - 1] : -1;

    stack.push(nums[index]);
  }

  return res;
};
// @lc code=end
