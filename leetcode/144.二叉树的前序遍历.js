/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
 * @return {number[]}
 */
// 递归
var preorderTraversal = function (root) {
  const result = [];

  const recursion = (root) => {
    if (!root) return;

    result.push(root.val);

    recursion(root.left);
    recursion(root.right);
  };

  recursion(root);

  return result;
};

// 迭代
// var preorderTraversal = function (root) {
//   const stack = [];
//   const result = [];

//   while (stack.length || root) {
//     while (root) {
//       result.push(root.val);
//       stack.push(root);

//       root = root.left;
//     }

//     root = stack.pop();
//     root = root.right;
//   }

//   return result;
// };

// mirrors
// var preorderTraversal = function (root) {
//   const result = [];

//   let cur = root;

//   while (cur) {

//   }

//   return result;
// }
// @lc code=end
