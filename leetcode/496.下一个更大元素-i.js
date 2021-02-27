/*
 * @lc app=leetcode.cn id=496 lang=javascript
 *
 * [496] 下一个更大元素 I
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const map = {}; // 存放答案的数组
  const stack = [];

  for (let i = 0; i < nums2.length; i++) {
    while (stack.length && stack[stack.length - 1] <= nums2[i]) {
      map[stack.pop()] = nums2[i];
    }

    stack.push(nums2[i]);
  }

  return nums1.map((item) => (map[item] ? map[item] : -1));
};
// @lc code=end
