/*
 * @lc app=leetcode.cn id=99 lang=javascript
 *
 * [99] 恢复二叉搜索树
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
  // 假设正常输出为 1，2，3，4，5，6
  // 错误的输出为 1，2，5，4，5，3
  // 将两个节点的值进行交换即可
  let first;
  let second;
  let pre;

  const check = (cur) => {
    if (pre && pre.val > cur.val) {
      if (!first) {
        first = pre;
      }
      second = cur;
    }

    pre = cur;
  };

  const dfs = (root) => {
    if (!root) return;

    dfs(root.left);
    check(root);
    dfs(root.right);
  };

  dfs(root);

  if (first && second) {
    let temp = first.val;
    first.val = second.val;
    second.val = temp;
  }
};
// @lc code=end
