/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  const need = {};
  const window = {};

  for (const c of s1) {
    need[c] = c in need ? need[c] + 1 : 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;

  while (right < s2.length) {
    const c = s2[right];
    right++;

    if (need[c]) {
      window[c] = c in window ? window[c] + 1 : 1;
      if (window[c] === need[c]) valid++;
    }

    // 判断左边窗口是否要缩小
    while (right - left >= s1.length) {
      // 在这里判断是否找到了合法的子串
      if (valid === Object.keys(need).length) return true;

      const d = s2[left];
      left++;

      if (need[d]) {
        if (window[d] === need[d]) valid--;

        window[d]--;
      }
    }
  }

  return false;
};
// @lc code=end
