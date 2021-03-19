/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
// 递归
// var isSameTree = function (p, q) {
//   if (!p && !q) {
//     return true;
//   } else if (!p || !q) {
//     return false;
//   } else {
//     return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
//   }
// };

// 迭代 用队列 层次比较
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;

  const pQueue = [p];
  const qQueue = [q];

  while (pQueue.length && qQueue.length) {
    const pLen = pQueue.length;
    const qLen = qQueue.length;

    if (pLen !== qLen) return false;

    let i = 0;
    while (i < pLen) {
      const pNode = pQueue.pop();
      const qNode = qQueue.pop();

      if (pNode.val !== qNode.val) return false;

      // 异或
      if (!pNode.left ^ !qNode.left) return false;
      if (!pNode.right ^ !qNode.right) return false;

      if (pNode.left) pQueue.unshift(pNode.left);
      if (qNode.left) qQueue.unshift(qNode.left);

      if (pNode.right) pQueue.unshift(pNode.right);
      if (qNode.right) qQueue.unshift(qNode.right);

      i++;
    }
  }

  return pQueue.length === 0 && qQueue.length === 0;
};
// @lc code=end
