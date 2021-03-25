export function quickSort(nums: number[]) {
  if (!nums || nums.length === 0) return;

  qSort(nums, 0, nums.length);
}

function qSort(nums: number[], lo: number, hi: number) {
  if (lo >= hi - 1) return;

  const mid = nums[Math.floor((lo + hi) / 2)];

  let i = lo;
  let l = lo;
  let r = hi - 1;

  while (i < r) {
    if (nums[i] > mid) {
      swap(nums, i, r--);
    } else if (nums[i] === mid) {
      i++;
    } else {
      swap(nums, i++, l++);
    }
  }

  qSort(nums, lo, i);
  qSort(nums, l, hi);
}

function swap(nums: number[], n1: number, n2: number) {
  const temp = nums[n1];
  nums[n1] = nums[n2];
  nums[n2] = temp;
}

function quickSort2(nums: number[]) {
  if (!nums || nums.length === 0) return;

  qSort2(nums, 0, nums.length - 1);
}

export function qSort2(nums: number[], lo: number, hi: number) {
  if (lo > hi || nums.length <= 1) return;

  const p = partition2(nums, lo, hi);

  qSort2(nums, lo, p - 1);
  qSort2(nums, p + 1, hi);
}

function partition2(nums: number[], lo: number, hi: number) {
  if (lo >= hi) return lo;
  // 将 nums[lo] 作为默认分界点 pivot
  let pivot = nums[lo];
  let i = lo;
  let j = hi + 1;

  while (true) {
    // 保证 nums[lo..i] 都小于 pivot
    while (nums[++i] < pivot) {
      if (i == hi) break;
    }

    // 保证 nums[j..hi] 都大于 pivot
    while (nums[--j] > pivot) {
      if (j == lo) break;
    }

    if (i >= j) break;
    // 如果走到这里，一定有：
    // nums[i] > pivot && nums[j] < pivot
    // 所以需要交换 nums[i] 和 nums[j]，
    // 保证 nums[lo..i] < pivot < nums[j..hi]
    swap(nums, i, j);
  }
  // 将 pivot 值交换到正确的位置
  swap(nums, j, lo);
  // 现在 nums[lo..j-1] < nums[j] < nums[j+1..hi]

  return j;
}
