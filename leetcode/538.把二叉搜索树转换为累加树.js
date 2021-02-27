/*
 * @lc app=leetcode.cn id=538 lang=javascript
 *
 * [538] 把二叉搜索树转换为累加树
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
 * @return {TreeNode}
 */
var convertBST = function(root) {
  if (!root) return null;

  let sum = 0;

  function getBSTSum(root) {
    if (!root) return null;
  
    getBSTSum(root.right);

    root.val += sum; 
    sum = root.val;
  
    getBSTSum(root.left);
  
    return root;
  }

  return getBSTSum(root);
};

// @lc code=end

