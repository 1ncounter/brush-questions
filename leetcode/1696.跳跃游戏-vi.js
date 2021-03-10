/*
 * @lc app=leetcode.cn id=1696 lang=javascript
 *
 * [1696] 跳跃游戏 VI
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  // 设置一个单调递减队列
  const queue = [];
  const dp = [];
  dp[0] = nums[0];

  for (let i = 0; i < nums.length; i++) {
    // 在取最大值之前，需要保证单调队列中都是有效值。
    // 也就是都在区间里面的值
    // 当要求 dp[i] 的时候 单调队列中应该是只能保存[i-k, i-1]这个范围
    if (i - k > 0) {
      if (queue.length && queue[0] == dp[i - k - 1]) {
        queue.shift();
      }
    }

    // 从单调队列中取得较大值
    const old = queue.length ? queue[0] : 0;
    dp[i] = old + nums[i];

    // 入队的时候，采用单调队列入队
    while (queue.length && queue[queue.length - 1] < dp[i]) {
      queue.pop();
    }
    queue.push(dp[i]);
  }

  return dp[dp.length - 1];
};
// @lc code=end
