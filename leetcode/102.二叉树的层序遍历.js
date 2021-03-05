/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
var levelOrder = function (root) {
  if (root == null) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    const len = curFloor.length;
    const floor = [];

    for (let i = 0; i < len; i++) {
      const item = queue.pop();

      floor.push(item.val);

      if (item.left) queue.unshift(item.left);
      if (item.right) queue.unshift(item.right);
    }

    result.push(floor);
  }

  return result;
};
// @lc code=end
