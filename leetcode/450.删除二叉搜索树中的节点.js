/*
 * @lc app=leetcode.cn id=450 lang=javascript
 *
 * [450] 删除二叉搜索树中的节点
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (!root) return null;

  if (root.val == key) {
    // 找到啦，进行删除
    // 1. A 恰好是末端节点，两个子节点都为空，那么它可以当场去世了。
    // 2. A 只有一个非空子节点，那么它要让这个孩子接替自己的位置。
    if (root.left == null) return root.right;
    if (root.right == null) return root.left;
    // 3. A 有两个子节点，为了不破坏 BST 的性质，A 必须找到左子树中最大的那个节点，或者右子树中最小的那个节点来接替自己。
    const minNode = getMin(root.right);
    root.val = minNode.val;
    root.right = deleteNode(root.right, minNode.val);
  } else if (root.val > key) {
    // 去左子树找
    root.left = deleteNode(root.left, key);
  } else if (root.val < key) {
    // 去右子树找
    root.right = deleteNode(root.right, key);
  }

  return root;
};

function getMin(node) {
  // BST 最左边的就是最小的
  while (node.left != null) node = node.left;
  return node;
}
// @lc code=end
