/*
 * @lc app=leetcode.cn id=904 lang=javascript
 *
 * [904] 水果成篮
 */

// @lc code=start
/**
 * @param {number[]} tree
 * @return {number}
 */
var totalFruit = function (tree) {
  const len = tree.length;
  const BASKET = 2;

  let ans = 0;
  let left = -1;
  let window = {};

  for (let i = 0; i < len; i++) {
    const current = tree[i];

    // 每一步都要放
    window[current] = window[current] ? window[current] + 1 : 1;

    // 所以每一步都要判断篮子是否超出2个
    while (Object.keys(window).length > BASKET) {
      --window[tree[++left]] === 0 && delete window[tree[left]];
    }

    ans = Math.max(ans, i - left);
  }

  return ans;
};
// @lc code=end
