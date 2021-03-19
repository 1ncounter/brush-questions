/*
 * @lc app=leetcode.cn id=572 lang=javascript
 *
 * [572] 另一个树的子树
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
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function (s, t) {
  if (!s) return false;

  return isSameTree(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
};

function isSameTree(s, t) {
  if (!s && !t) return true;
  if (!s || !t) return false;

  return s.val === t.val && isSameTree(s.left, t.left) && isSameTree(s.right, t.right);
}
// @lc code=end
