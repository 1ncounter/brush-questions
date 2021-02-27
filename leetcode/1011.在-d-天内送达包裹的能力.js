/*
 * @lc app=leetcode.cn id=1011 lang=javascript
 *
 * [1011] 在 D 天内送达包裹的能力
 */

// @lc code=start
/**
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
var shipWithinDays = function (weights, D) {
  // 船的载重最小应大于包裹重量 最大可小于等于包裹重量总和（一天把包裹运送完）
  let left = Math.max(...weights);
  let right = weights.reduce((prev, cur) => prev + cur, 0) + 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (canFinish(weights, mid, D)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

/**
 * @param {number[]} weights
 * @param {number} speed
 * @param {number} D
 * @return {boolean}
 */
function canFinish(weights, speed, D) {
  let i = 0;

  for (let day = 0; day < D; day++) {
    let maxSpeed = speed;

    while ((maxSpeed -= weights[i]) >= 0) {
      i++;
      if (i == weights.length) return true;
    }
  }

  return false;
}
// @lc code=end
