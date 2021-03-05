/*
 * @lc app=leetcode.cn id=662 lang=javascript
 *
 * [662] 二叉树最大宽度
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
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  if (root == null) return 0;

  // 使用bigint 防止id超限
  let max = BigInt(1);
  const queue = [[root, BigInt(1)]];

  while (queue.length) {
    const len = queue.length;
    const floor = [];

    for (let i = 0; i < len; i++) {
      const [item, id] = queue.pop();

      floor.push(id);

      if (item.left) queue.unshift([item.left, BigInt(2) * id]);
      if (item.right) queue.unshift([item.right, BigInt(2) * id + BigInt(1)]);
    }

    const cur = floor[floor.length - 1] - floor[0] + BigInt(1);
    max = max > cur ? max : cur;
  }

  return max.valueOf();
};
// @lc code=end
