/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;

  if (p.val === root.val || q.val === root.val) return root;

  const leftSon = lowestCommonAncestor(root.left, p, q);
  const rightSon = lowestCommonAncestor(root.right, p, q);

  if (leftSon && rightSon) return root;

  return leftSon ? leftSon : rightSon;
};
// @lc code=end
