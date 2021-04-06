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
// var checkInclusion = function (s1, s2) {
//   const need = {};
//   const window = {};

//   for (const c of s1) {
//     need[c] = c in need ? need[c] + 1 : 1;
//   }

//   let left = 0;
//   let right = 0;
//   let valid = 0;

//   while (right < s2.length) {
//     const c = s2[right];
//     right++;

//     if (need[c]) {
//       window[c] = c in window ? window[c] + 1 : 1;
//       if (window[c] === need[c]) valid++;
//     }

//     // 判断左边窗口是否要缩小
//     while (right - left >= s1.length) {
//       // 在这里判断是否找到了合法的子串
//       if (valid === Object.keys(need).length) return true;

//       const d = s2[left];
//       left++;

//       if (need[d]) {
//         if (window[d] === need[d]) valid--;

//         window[d]--;
//         if (window[d] === 0) delete window[d];
//       }
//     }
//   }

//   return false;
// };

var checkInclusion = function (s1, s2) {
  if (!s1 || !s2) return false;

  const len1 = s1.length;
  const len2 = s2.length;

  const window = {};
  const need = {};

  for (const c of s1) {
    need[c] = need[c] ? need[c] + 1 : 1;
  }

  let left = -1;
  let equal = 0;

  for (let i = 0; i < len2; i++) {
    const char = s2[i];

    window[char] = window[char] ? window[char] + 1 : 1;

    // 第一个字符串的 排列之一 是第二个字符串的 子串 。
    if (need[char] === window[char]) equal++;

    while (i - left >= len1) {
      if (equal === Object.keys(need).length) return true;

      const rmc = s2[++left];
      if (need[rmc] === window[rmc]) equal--;
      window[rmc]--;
      if (window[rmc] === 0) delete window[rmc];
    }
  }

  return false;
};
// @lc code=end
