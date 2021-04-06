/*
 * @lc app=leetcode.cn id=30 lang=javascript
 *
 * [30] 串联所有单词的子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  const len = s.length;
  const wordsLen = words.length;

  if (len === 0 || wordsLen === 0) return [];

  const ans = [];
  const wordLen = words[0].length;

  const needs = {};

  for (const word of words) {
    needs[word] = needs[word] ? needs[word] + 1 : 1;
  }

  // s 长度不一定是整数倍的单词长度
  for (let start = 0; start < wordLen; start++) {
    let left = start - wordLen;
    let equal = 0;
    let count = 0;
    const window = {};

    for (let i = start; i <= len - wordLen; i += wordLen) {
      const cur = s.substring(i, i + wordLen);

      window[cur] = window[cur] ? window[cur] + 1 : 1;

      if (needs[cur] === window[cur]) equal++;
      count++;

      while (count >= wordsLen) {
        if (equal === Object.keys(needs).length) {
          ans.push(left + wordLen);
        }

        left += wordLen;
        const rmword = s.substring(left, left + wordLen);
        if (window[rmword] === needs[rmword]) equal--;
        window[rmword]--;
        if (window[rmword] === 0) delete window[rmword];
        count--;
      }
    }
  }

  return ans;
};
// @lc code=end
