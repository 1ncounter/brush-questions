/*
 * @lc app=leetcode.cn id=1109 lang=javascript
 *
 * [1109] 航班预订统计
 */

// @lc code=start
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
  const diff = new Array(n + 1).fill(0);

  for (const [j, k, l] of bookings) {
    diff[j - 1] += l;
    diff[k] -= l;
  }

  const res = [];
  res[0] = diff[0];

  for (let i = 1; i < n; i++) {
    res[i] = res[i - 1] + diff[i];
  }

  return res;
};
// @lc code=end
