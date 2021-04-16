/*
 * @lc app=leetcode.cn id=1091 lang=javascript
 *
 * [1091] 二进制矩阵中的最短路径
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const N = grid.length;

  if (grid[0][0] === 1 || grid[N - 1][N - 1] === 1) return -1;

  const queue = [];
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  queue.unshift([0, 0]);
  grid[0][0] = 1;

  while (queue.length) {
    let len = queue.length;

    while (len-- > 0) {
      const point = queue.pop();

      for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];
        const x = point[0] + dir[0];
        const y = point[1] + dir[1];

        if (x >= 0 && y >= 0 && x < N && y < N && grid[x][y] === 0) {
          queue.unshift([x, y]);
          grid[x][y] = grid[point[0]][point[1]] + 1;
        }
      }
    }
  }

  return grid[N - 1][N - 1] === 0 ? -1 : grid[N - 1][N - 1];
};
// @lc code=end
