/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  const queue = [];
  const result = [];

  let forward = true;

  if (root !== null) queue.unshift(root);

  while (queue.length) {
    const len = queue.length;
    const floor = [];

    for (let i = 0; i < len; i++) {
      const node = queue.pop();

      if (forward) {
        floor.push(node.val);
      } else {
        floor.unshift(node.val);
      }

      if (node.left) queue.unshift(node.left);
      if (node.right) queue.unshift(node.right);
    }

    forward = !forward;
    result.push(floor);
  }

  return result;
};
// @lc code=end
