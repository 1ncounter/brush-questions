/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  if (nums.length === 0) return [];

  const ans = [];
  const path = [];

  // function backtrack(A, start) {
  //   if (path.length === A.length) {
  //     ans.push([...path]);
  //   }

  //   if (start === A.length) return;

  //   for (let i = 0; i < A.length; i++) {
  //     if (path.includes(A[i])) continue;

  //     path.push(A[i]);
  //     backtrack(A, i + 1);
  //     path.pop();
  //   }
  // }

  function backtrack(A, start) {
    if (start === A.length) {
      ans.push([...A]);
      return;
    }

    for (let i = start; i < A.length; i++) {
      swap(A, start, i);
      backtrack(A, start + 1);
      swap(A, i, start);
    }
  }

  backtrack(nums, 0);

  return ans;
};

function swap(nums, n1, n2) {
  const temp = nums[n1];
  nums[n1] = nums[n2];
  nums[n2] = temp;
}
// @lc code=end
