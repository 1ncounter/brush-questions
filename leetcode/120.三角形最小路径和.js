/*
 * @lc app=leetcode.cn id=120 lang=javascript
 *
 * [120] 三角形最小路径和
 */

// @lc code=start
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  const M = triangle.length;
  const memo = new Array(M).fill(0).map((_) => []);

  const dfs = (i, j) => {
    if (i === M) return 0;
    if (memo[i][j]) return memo[i][j];

    const ans = triangle[i][j] + Math.min(dfs(i + 1, j + 1), dfs(i + 1, j));

    memo[i][j] = ans;

    return ans;
  };

  return dfs(0, 0);
};
// @lc code=end
