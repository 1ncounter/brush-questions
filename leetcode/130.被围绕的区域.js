/*
 * @lc app=leetcode.cn id=130 lang=javascript
 *
 * [130] 被围绕的区域
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  if (!board || board.length === 0) return;

  const VISITED = 'V';
  const M = board.length;
  const N = board[0].length;

  const dfs = (board, i, j) => {
    // 如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
    if (
      i < 0 ||
      i >= M ||
      j < 0 ||
      j >= N ||
      board[i][j] === 'X' ||
      board[i][j] === VISITED
    ) {
      return;
    }

    board[i][j] = VISITED;

    dfs(board, i, j + 1);
    dfs(board, i, j - 1);
    dfs(board, i - 1, j);
    dfs(board, i + 1, j);
  };

  // Step 1. 从边缘出发，遍历所有与之相邻的点。
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      // 边缘坐标
      const isEdge = i === 0 || j === 0 || i === M - 1 || j === N - 1;

      if (isEdge && board[i][j] === 'O') {
        dfs(board, i, j);
      }
    }
  }

  // Step 2. 把所有未标记过的点，修改为'X', 并将标记过的点修改为'O'
  // 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === VISITED) {
        board[i][j] = 'O';
      } else {
        board[i][j] = 'X';
      }
    }
  }
};
// @lc code=end
