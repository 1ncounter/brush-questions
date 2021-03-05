/*
 * @lc app=leetcode.cn id=84 lang=javascript
 *
 * [84] 柱状图中最大的矩形
 *
 * https://blog.csdn.net/Zolewit/article/details/88863970
 */

// @lc code=start
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const len = heights.length;
  let max = 0;

  for (let i = 0; i < len; i++) {
    const leftPos = findLeftSmall(i, heights);
    const rightPos = findRightSmall(i, heights);

    const area = heights[i] * (rightPos - leftPos + 1);
    max = Math.max(max, area);
  }

  return max;
};

function findLeftSmall(index, heights) {
  let stack = [];

  for (let i = 0; i < index; i++) {
    while (stack.length && heights[stack[stack.length - 1]] < heights[i]) {
      stack = [];
    }

    stack.push(i);
  }

  return heights[stack[stack.length - 1]] > heights[index] ? stack[0] : index;
}

function findRightSmall(index, heights) {
  const stack = [];

  for (let i = index; i < heights.length; i++) {
    if (heights[i] < heights[index]) break;

    while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
      stack.pop();
    }

    stack.push(i);
  }

  return stack.length > 1 ? stack[stack.length - 1] : index;
}
// @lc code=end
