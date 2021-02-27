/*
 * @lc app=leetcode.cn id=297 lang=javascript
 *
 * [297] 二叉树的序列化与反序列化
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
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (root == null) {
    return 'null';
  }

  const left = serialize(root.left);
  const right = serialize(root.right);

  return root.val + ',' + left + ',' + right;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const arr = data.split(',');

  const buildTree = (arr) => {
    if (arr.length === 0) return null;

    const rootValue = arr.shift();
    if (rootValue === 'null') return null;

    const root = new TreeNode(rootValue);

    root.left = buildTree(arr);
    root.right = buildTree(arr);

    return root;
  };

  return buildTree(arr);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end
