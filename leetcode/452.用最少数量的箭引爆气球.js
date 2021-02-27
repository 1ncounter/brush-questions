/*
 * @lc app=leetcode.cn id=452 lang=javascript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
  points.sort((a, b) => a[1] - b[1])

  let count = 0;

  let start = 1;
  let prev = points[0];

  while (start < points.length) {
    let flag = start;
    let cur = points[flag];

    while (cur && prev[1] >= cur[0]) {
      flag++;
      cur = points[flag];
    }

    start = flag;
    prev = cur;
    count++;
  }

  return count;
};
// @lc code=end

