/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;

  const dpTable = [];

  // base case
  for (let i = 0; i <= m; i++) {
    dpTable[i] = [];
    dpTable[i][0] = i;
  }
  for (let j = 1; j <= n; j++) {
    dpTable[0][j] = j;
  }

  // 自顶向上
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1.charAt(i - 1) === word2.charAt(j - 1)) {
        dpTable[i][j] = dpTable[i - 1][j - 1];
      } else {
        dpTable[i][j] = Math.min(
          dpTable[i - 1][j] + 1, // i 保持上一步顶位置 j 向前一步 删除
          dpTable[i][j - 1] + 1, // j 保持上一步的位置 i 向前一步 代表插入
          dpTable[i - 1][j - 1] + 1 // 直接替换 步数加1
        );
      }
    }
  }

  return dpTable[m][n];
};
// @lc code=end
