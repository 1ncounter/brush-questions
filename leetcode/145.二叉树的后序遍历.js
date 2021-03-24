/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
 * @return {number[]}
 */
// var postorderTraversal = function (root) {
//   const ans = [];

//   const postOrder = (root) => {
//     if (root === null) return root;

//     postOrder(root.left);
//     postOrder(root.right);
//     ans.push(root.val);
//   };

//   postOrder(root);

//   return ans;
// };

var postorderTraversal = function (root) {
  const ans = [];
  const stack = [];

  let pre;

  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();

    if (!root.right || root.right === pre) {
      ans.push(root.val);
      pre = root;
      root = null;
    } else {
      stack.push(root);
      root = root.right;
    }
  }

  return ans;
};
// @lc code=end
