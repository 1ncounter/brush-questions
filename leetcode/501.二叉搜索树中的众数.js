/*
 * @lc app=leetcode.cn id=501 lang=javascript
 *
 * [501] 二叉搜索树中的众数
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 *
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * 用一个哈希表来统计每个数字出现的个数，
 * 这样就可以找到出现次数最多的数字。但是这样做的空间复杂度显然不是 O(1)O(1) 的，
 * 原因是哈希表和保存中序遍历序列的空间代价都是 O(n) O(n)。
 */
// var findMode = function (root) {
//   const map = {};

//   const dfs = (root) => {
//     if (!root) return;

//     dfs(root.left);
//     if (!map[root.val]) map[root.val] = 0;
//     map[root.val]++;
//     dfs(root.right);
//   };

//   dfs(root);

//   const max = Math.max(...Object.values(map));

//   return Object.entries(map)
//     .filter(([, val]) => val === max)
//     .map(([key]) => Number(key));
// };

/**
 * 因为这棵树的中序遍历是一个有序的序列，所以我们可以先获得这棵树的中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function (root) {
  let ans = [];
  let max = 0;
  let count = 0;
  let cur = 0;

  const update = (n) => {
    if (n === cur) {
      count++;
    } else {
      count = 1;
      cur = n;
    }

    if (count > max) {
      max = count;
      ans = [cur];
    } else if (count === max) {
      ans.push(cur);
    }
  };

  const dfs = (root) => {
    if (!root) return;

    dfs(root.left);
    update(root.val);
    dfs(root.right);
  };

  dfs(root);

  return ans;
};
// @lc code=end
