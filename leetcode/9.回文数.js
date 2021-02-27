/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const flag = x < 0 ? 1 : 0;

  if (flag) return false;

  const arr = [];

  while (x >= 10) {
    const res = x % 10;
    arr.unshift(res);

    x = Math.floor(x / 10);
  }

  arr.unshift(x);

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] !== arr[right]) return false;

    left++;
    right--;
  }

  return true;
};
// @lc code=end
