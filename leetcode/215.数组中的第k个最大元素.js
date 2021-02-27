/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// var findKthLargest = function (nums, k) {
//   nums.sort((a, b) => a - b);

//   return nums[nums.length - k];
// };
var findKthLargest = function (nums, k) {
  // 首先随机打乱数组
  shuffle(nums);

  let lo = 0;
  let hi = nums.length - 1;
  k = nums.length - k;

  while (lo <= hi) {
    const p = partition(nums, lo, hi);

    if (p < k) {
      lo = p + 1;
    } else if (p > k) {
      hi = p - 1;
    } else {
      return nums[p];
    }
  }

  return -1;
};

/**
 * 对数组元素进行随机打乱
 * @param {number[]} nums
 */
function shuffle(nums) {
  const n = nums.length;
  const rand = Math.random();

  for (let i = 0; i < n; i++) {
    // 从 i 到最后随机选一个元素
    const r = i + Math.floor(rand * (n - i));
    swap(nums, i, r);
  }
}

/**
 *
 * @param {number[]} nums
 * @param {number} lo
 * @param {number} hi
 */
function partition(nums, lo, hi) {
  const pivot = nums[lo];

  let i = lo;
  let j = hi + 1;

  while (true) {
    // 保证 [lo..j] 都小于pivot
    while (nums[++i] < pivot) {
      if (i == hi) break;
    }

    // 保证 [j..hi] 都大于pivot
    while (nums[--j] > pivot) {
      if (i == lo) break;
    }

    if (i >= j) break;

    // 如果走到这里，一定有：
    // nums[i] > pivot && nums[j] < pivot
    // 进行交换位置
    swap(nums, i, j);
  }
  // 把pivot换到中间也就是j上
  swap(nums, lo, j);

  return j;
}

/**
 * 交换数组中的两个元素
 * @param {number[]} nums
 * @param {number} i
 * @param {number} j
 */
function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}
// @lc code=end
