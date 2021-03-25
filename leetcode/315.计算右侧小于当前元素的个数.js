/*
 * @lc app=leetcode.cn id=315 lang=javascript
 *
 * [315] 计算右侧小于当前元素的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
  if (nums.length === 0) return nums;

  const ans = new Array(nums.length).fill(0);
  const temp = [];
  // 新建数组索引
  const idx = new Array(nums.length).fill(0).map((_, idx) => idx);

  function msort(nums, start, end) {
    if (start >= end - 1 || nums.length === 0) return;

    const mid = Math.floor((start + end) / 2);

    msort(nums, start, mid);
    msort(nums, mid, end);

    let i = start;
    let j = mid;
    let to = start;

    // 进行索引排序
    while (i < mid || j < end) {
      if (j >= end || (i < mid && nums[idx[i]] <= nums[idx[j]])) {
        // 算出每个索引的逆序对
        ans[idx[i]] += j - mid;
        temp[to++] = idx[i++];
      } else {
        temp[to++] = idx[j++];
      }
    }

    for (i = start; i < end; i++) {
      idx[i] = temp[i];
    }
  }

  msort(nums, 0, nums.length);

  return ans;
};
// @lc code=end
