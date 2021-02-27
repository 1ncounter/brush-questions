/*
 * @lc app=leetcode.cn id=875 lang=javascript
 *
 * [875] 爱吃香蕉的珂珂
 */

// @lc code=start
/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function (piles, H) {
  let left = 1;
  let right = Math.max(...piles) + 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (canFinish(piles, mid, H)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

/**
 * @param {number[]} piles
 * @param {number} speed
 * @param {number} H
 * @return {boolean}
 */
function canFinish(piles, speed, H) {
  let consume = 0;

  for (const pile of piles) {
    const time = Math.ceil(pile / speed);
    consume += time;
  }

  return consume <= H;
}
// @lc code=end
