/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const result = [];

  const need = {};
  const window = {};

  for (const ch of p) {
    need[ch] = ch in need ? need[ch] + 1 : 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;

  while (right < s.length) {
    const c = s[right];
    right++;

    // 进行窗口内数据的一系列更新
    if (need[c]) {
      window[c] = c in window ? window[c] + 1 : 1;
      if (window[c] === need[c]) valid++;
    }

    if (right - left >= p.length) {
      // 当窗口符合条件时，把起始索引加入 res
      if (valid === Object.keys(need).length) {
        result.push(left);
      }

      const d = s[left];
      left++;

      // 进行窗口内数据的一系列更新
      if (need[d]) {
        if (window[d] === need[d]) valid--;
        window[d]--;
      }
    }
  }

  return result;
};
// @lc code=end
