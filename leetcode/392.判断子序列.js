/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let i = 0;
  let j = 0;

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) i++;
    j++;
  }

  return i === s.length;

  // 进阶
  // 把 t 的字符顺序记录到hash表中
  // 遍历 s 按顺序查找hash表中的对应索引
  // const map = {};

  // for (let i = 0; i < t.length; i++) {
  //   if (!map[t[i]]) map[t[i]] = [];
  //   map[t[i]].push(i);
  // }

  // for (let i = 0; i < s.length; i++) {
  //   const char = s[i];

  //   if (!map[char]) return false;
  //   if (!map[char].some((_) => _ >= i)) return false;
  // }

  // return true;
};
// @lc code=end
