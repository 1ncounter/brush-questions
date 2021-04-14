/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits) return [];

  const wordMap = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  };

  const ans = [];
  const path = [];

  function backtrack(A, i, path, ans) {
    if (A.length === i) {
      ans.push(path.join(''));
      return;
    }

    const words = wordMap[A[i]];

    for (const word of words) {
      path.push(word);
      backtrack(A, i + 1, path, ans);
      path.pop();
    }
  }

  backtrack(digits, 0, path, ans);

  return ans;
};
// @lc code=end
