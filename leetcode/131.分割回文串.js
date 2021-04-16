/*
 * @lc app=leetcode.cn id=131 lang=javascript
 *
 * [131] 分割回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const N = s.length;
  const ans = [];
  const path = [];

  function backtrack(A, idx, path, ans) {
    if (idx === N) {
      ans.push([...path]);
      return;
    }

    for (let i = idx; i < N; i++) {
      if (!checkPalindrome(A, idx, i)) continue;

      path.push(A.substring(idx, i + 1));
      backtrack(A, i + 1, path, ans);
      path.pop();
    }
  }

  backtrack(s, 0, path, ans);

  return ans;
};

function checkPalindrome(s, left, right) {
  while (left < right) {
    if (s[left] !== s[right]) return false;

    left++;
    right--;
  }

  return true;
}
// @lc code=end
