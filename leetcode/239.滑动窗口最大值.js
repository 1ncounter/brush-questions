/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const queue = createDecQueue();
  const result = [];

  for (let i = 0; i < k; i++) {
    queue.push(nums[i]);
  }

  if (queue.length) result.push(queue.front());

  for (let i = k; i < nums.length; i++) {
    queue.push(nums[i]);
    queue.pop(nums[i - k]);

    result.push(queue.front());
  }

  return result;
};

function createDecQueue() {
  const data = [];

  const push = (val) => {
    while (data.length && data[data.length - 1] < val) {
      data.pop();
    }

    data.push(val);
  };
  const pop = (val) => {
    if (data.length && front() === val) {
      data.shift();
    }
  };
  const front = () => {
    return data.length ? data[0] : -1;
  };

  return {
    data,
    push,
    pop,
    front,
    get length() {
      return data.length;
    },
  };
}

// @lc code=end
