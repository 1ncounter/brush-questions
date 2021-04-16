/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let ans = 0;

  if (!grid || grid.length === 0) return ans;

  const M = grid.length;
  const N = grid[0].length;
  const VIS = '2';

  const dfs = (grid, i, j) => {
    if (i < 0 || i >= M || j < 0 || j >= N || grid[i][j] !== '1') return;

    grid[i][j] = VIS;

    dfs(grid, i - 1, j);
    dfs(grid, i + 1, j);
    dfs(grid, i, j - 1);
    dfs(grid, i, j + 1);
  };

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === '1') {
        ans++;
        dfs(grid, i, j);
      }
    }
  }

  return ans;
};
// @lc code=end
