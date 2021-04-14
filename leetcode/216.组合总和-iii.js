/*
 * @lc app=leetcode.cn id=216 lang=javascript
 *
 * [216] 组合总和 III
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  const ans = [];
  const used = [];
  const set = new Set();

  function backtrack(idx, total, path, ans) {
    if (path.length === k) {
      if (total === n) {
        const cur = [...path].sort();
        const flag = cur.join('');

        if (set.has(flag)) return;

        ans.push([...cur]);
        set.add(flag);
      }

      return;
    }

    for (let i = idx; i <= 9; i++) {
      if (used[i]) continue;

      path.push(i);
      used[i] = 1;
      backtrack(idx + 1, total + i, path, ans);
      used[i] = 0;
      path.pop();
    }
  }

  backtrack(1, 0, [], ans);

  return ans;
};
// @lc code=end
