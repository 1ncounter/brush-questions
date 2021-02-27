/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  if (intervals.length === 0) return 0;

  return intervals.length - intervalSchedule(intervals);
};

/**
 * 贪心算法问题 Interval Scheduling（区间调度问题）
 * @param {number[][]} intervals
 * @return {number}
 */
function intervalSchedule(intervals) {
  intervals.sort((a, b) => {
    return a[1] - b[1];
  });
  // 至少有一个区间不相交
  let count = 1;
  // 排序后，第一个区间就是 x
  let x_end = intervals[0][1];

  for (const interval of intervals) {
    let start = interval[0];

    if (start >= x_end) {
      // 找到下一个选择的区间了
      count++;
      x_end = interval[1];
    }
  }

  return count;
}
// @lc code=end
