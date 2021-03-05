/*
 * @lc app=leetcode.cn id=117 lang=javascript
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  const queue = [];

  if (root !== null) queue.unshift(root);

  while (queue.length) {
    const len = queue.length;
    const floor = [];

    for (let i = 0; i < len; i++) {
      const node = queue.pop();

      floor.push(node);

      if (node.left) queue.unshift(node.left);
      if (node.right) queue.unshift(node.right);
    }

    for (let i = 0; i < floor.length; i++) {
      if (floor[i + 1]) floor[i].next = floor[i + 1];
    }
  }

  return root;
};
// @lc code=end
