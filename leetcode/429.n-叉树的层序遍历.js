/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N 叉树的层序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root == null) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    const len = queue.length;
    const floor = [];

    for (let i = 0; i < len; i++) {
      const node = queue.pop();

      floor.push(node.val);

      if (node.children && node.children.length > 0) {
        for (const n of node.children) queue.unshift(n);
      }
    }

    result.push(floor);
  }

  return result;
};
// @lc code=end
