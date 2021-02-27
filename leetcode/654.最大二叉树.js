/*
 * @lc app=leetcode.cn id=654 lang=javascript
 *
 * [654] 最大二叉树
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
  if (nums.length === 0) return null;

  return build(nums, 0, nums.length - 1);
};

function build(nums, start, end) {
  if (start > end) return null;

  let max = Number.MIN_SAFE_INTEGER;
  let index = start;

  for (let i = start; i <= end; i++) {
    if (max < nums[i]) {
      max = nums[i];
      index = i;
    }
  }

  const root = new TreeNode(max);

  root.left = build(nums, start, index - 1);
  root.right = build(nums, index + 1, end);

  return root;
}
// @lc code=end

