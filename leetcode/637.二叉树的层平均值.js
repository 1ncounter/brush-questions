/*
 * @lc app=leetcode.cn id=637 lang=javascript
 *
 * [637] 二叉树的层平均值
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  if (root == null) return 0;

  const queue = [root];
  const result = [];

  while (queue.length) {
    const len = queue.length;
    const floor = [];

    for (let i = 0; i < len; i++) {
      const node = queue.pop();

      floor.push(node.val);

      if (node.left) queue.unshift(node.left);
      if (node.right) queue.unshift(node.right);
    }

    const average = floor.reduce((prev, cur) => prev + cur, 0) / floor.length;
    result.push(average);
  }

  return result;
};
// @lc code=end
