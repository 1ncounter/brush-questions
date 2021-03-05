/*
 * @lc app=leetcode.cn id=559 lang=javascript
 *
 * [559] N 叉树的最大深度
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
 * @return {number}
 */
var maxDepth = function (root) {
  const queue = [];

  if (root !== null) queue.unshift(root);

  let maxDepth = 0;

  while (queue.length) {
    const len = queue.length;

    for (let i = 0; i < len; i++) {
      const node = queue.pop();

      if (node.children && node.children.length) {
        queue.unshift(...node.children.reverse());
      }
    }

    maxDepth++;
  }

  return maxDepth;
};
// @lc code=end
