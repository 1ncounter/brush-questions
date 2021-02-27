/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const needs = {};
  const window = {};

  for (const ch of t) {
    obj[ch] = ch in obj ? obj[ch] + 1 : 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;

  // 记录最小覆盖子串的起始索引及长度
  let start = 0;
  let len = s.length + 1;

  while (right < s.length) {
    // c 是将移入窗口的字符
    const c = s[right];
    // 右移窗口
    right++;

    if (needs[c]) {
      obj[c] = c in obj ? obj[c] + 1 : 1;

      if (window[c] === needs[c]) valid++;
    }

    // 判断左侧窗口是否要收缩
    while (valid === Object.keys(needs).length) {
      // 在这里更新最小覆盖子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }
      // d 是将移出窗口的字符
      const d = s[left];
      // 左移窗口
      left++;

      // 进行窗口内数据的一系列更新
      if (needs[d]) {
        if (window[d] == needs[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }

  // 返回最小覆盖子串
  return len > s.length ? '' : s.substr(start, len);
};
// @lc code=end
