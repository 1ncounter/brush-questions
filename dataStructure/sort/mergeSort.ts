function mSort(start: number, end: number, nums: number[]) {
  if (start >= end - 1) return;

  const mid = Math.floor((start + end) / 2);

  mSort(start, mid, nums);
  mSort(mid, end, nums);

  const temp: number[] = [];
  let i = start;
  let j = mid;

  while (i < mid || j < end) {
    if (j >= end || (i < mid && nums[i] <= nums[j])) {
      temp.push(nums[i++]);
    } else {
      temp.push(nums[j++]);
    }
  }

  i = start;
  while (temp.length) {
    nums[i++] = temp.shift();
  }
}

export function mergeSort(nums: number[]) {
  if (!nums || nums.length === 0) return;

  mSort(0, nums.length, nums);
}
