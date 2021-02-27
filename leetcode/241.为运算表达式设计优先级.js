/*
 * @lc app=leetcode.cn id=241 lang=javascript
 *
 * [241] 为运算表达式设计优先级
 */

// @lc code=start
/**
 * @param {string} input
 * @return {number[]}
 */
const memo = new Map();

var diffWaysToCompute = function (input) {
  if (memo.has(input)) return memo.get(input);

  const res = [];

  for (let i = 0; i < input.length; i++) {
    const c = input.charAt(i);

    if (c === '+' || c === '-' || c === '*') {
      /****** 分 ******/
      // 以运算符为中心，分割成两个字符串，分别递归计算
      const left = diffWaysToCompute(input.substring(0, i));
      const right = diffWaysToCompute(input.substring(i + 1));

      /****** 治 ******/
      for (const a of left) {
        for (const b of right) {
          if (c == '+') {
            res.push(a + b);
          } else if (c == '-') {
            res.push(a - b);
          } else if (c == '*') {
            res.push(a * b);
          }
        }
      }
    }
  }

  // base case
  // 如果 res 为空，说明算式是一个数字，没有运算符
  if (res.length === 0) {
    res.push(parseInt(input));
  }

  memo.set(input, res);

  return res;
};
// @lc code=end
