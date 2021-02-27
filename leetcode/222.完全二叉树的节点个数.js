/*
 * @lc app=leetcode.cn id=222 lang=javascript
 *
 * [222] 完全二叉树的节点个数
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
 * @return {number}
 */
var countNodes = function (root) {
  if (!root) return 0;

  let l = root;
  let r = root;
  // 记录左、右子树的高度
  let hl = 0;
  let hr = 0;

  while (l != null) {
    l = l.left;
    hl++;
  }
  while (r != null) {
    r = r.right;
    hr++;
  }

  // 如果左右子树的高度相同，则是一棵满二叉树
  if (hl == hr) {
    return Math.pow(2, hl) - 1;
  }

  return 1 + countNodes(root.left) + countNodes(root.right);
};
// @lc code=end
