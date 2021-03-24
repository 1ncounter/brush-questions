/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (!inorder.length || !postorder.length) return null;

  const rootValue = postorder[postorder.length - 1];
  const rootIndex = inorder.findIndex((i) => i === rootValue);

  const root = new TreeNode(rootValue);

  // 后序遍历 [ [左子树的前序遍历结果], [右子树的前序遍历结果], 根节点  ]
  // 中序遍历 [ [左子树的中序遍历结果], 根节点, [右子树的中序遍历结果] ]
  root.left = buildTree(inorder.slice(0, rootIndex), postorder.slice(0, rootIndex));
  root.right = buildTree(
    inorder.slice(rootIndex + 1, inorder.length),
    postorder.slice(rootIndex, postorder.length - 1)
  );

  return root;
};
// @lc code=end
