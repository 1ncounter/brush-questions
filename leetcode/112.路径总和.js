/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
// 递归dfs
var hasPathSum = function (root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;

  return (
    hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
  );
};

// 层次遍历bfs

// 前序遍历 stack

// 回溯
// var hasPathSum = function (root, targetSum) {
//   const ans = [];

//   function backtrace(root, path, sum) {
//     if (!root) return;

//     sum += root.val;
//     path.push(root.val);

//     if (!root.left && !root.right) {
//       if (sum === targetSum) ans.push(path);
//     } else {
//       backtrace(root.left, path, sum);
//       backtrace(root.right, path, sum);
//     }

//     path.pop();
//   }

//   backtrace(root, [], 0);

//   return ans.length > 0;
// };
// @lc code=end
