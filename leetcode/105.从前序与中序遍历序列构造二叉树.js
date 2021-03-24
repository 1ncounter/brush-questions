/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;

  const rootValue = preorder[0];
  const rootIndex = inorder.findIndex((i) => i === rootValue);

  const root = new TreeNode(rootValue);

  // 前序遍历 [ 根节点, [左子树的前序遍历结果], [右子树的前序遍历结果] ]
  // 中序遍历 [ [左子树的中序遍历结果], 根节点, [右子树的中序遍历结果] ]
  root.left = buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex + 1));
  root.right = buildTree(
    preorder.slice(rootIndex + 1, preorder.length),
    inorder.slice(rootIndex + 1, inorder.length)
  );

  return root;
};
// @lc code=end
