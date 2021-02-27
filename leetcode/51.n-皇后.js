/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
const queen = 'Q';
const empty = '.';

var solveNQueens = function (n) {
  if (n === 0) return [];

  const result = [];

  // 初始化棋盘
  const board = new Array(n).fill(empty).map((item) => new Array(n).fill(empty));

  function backtrack(board, row) {
    if (row === n) {
      result.push(board.map((row) => row.join('')));
      return;
    }

    for (let col = 0; col < board[row].length; col++) {
      // 判断上下是否攻击
      if (!isValid(board, row, col)) continue;

      board[row][col] = queen;
      backtrack(board, row + 1);
      board[row][col] = empty;
    }
  }

  backtrack(board, 0);

  return result;
};

function isValid(board, row, col) {
  const n = board[row].length;

  // 检查列是否有皇后互相冲突
  for (let i = 0; i < n; i++) {
    if (board[i][col] === queen) return false;
  }

  // 检测右上方是否有皇后互相冲突
  for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] === queen) return false;
  }

  // 检测左上方是否有皇后互相冲突
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === queen) return false;
  }

  return true;
}
// @lc code=end
