/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  return isBST2(root);
};

// 递归 前序
function isBST(root, min, max) {
  if (!root) return true;
  if (max && root.val >= max.val) return false;
  if (min && root.val <= min.val) return false;

  return isBST(root.left, min, root) && isBST(root.right, root, max);
}

// 用栈来迭代 中序
function isBST2(root) {
  if (!root) return false;

  const stack = [];
  let inorder = -Infinity;

  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();

    // 中序 左 -> 中 -> 右 大小从小到大
    // 如果中序遍历得到的节点的值小于等于前一个 inorder，说明不是二叉搜索树
    if (inorder >= root.val) return false;

    inorder = root.val;
    root = root.right;
  }

  return true;
}
// @lc code=end
