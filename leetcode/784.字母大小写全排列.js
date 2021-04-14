/*
 * @lc app=leetcode.cn id=784 lang=javascript
 *
 * [784] 字母大小写全排列
 */

// @lc code=start
/**
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function (S) {
  if (!S) return [];

  const ans = new Set();
  const path = [];

  function backtrack(i) {
    if (i === S.length) {
      ans.add(path.join(''));
      return;
    }

    const cur = S[i];
    const canUse = [];

    if (/0-9/.test(cur)) {
      canUse.push(cur);
    } else {
      canUse.push(cur.toLowerCase(), cur.toUpperCase());
    }

    for (const item of canUse) {
      path.push(item);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);

  return [...ans];
};
// @lc code=end
