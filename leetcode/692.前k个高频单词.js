/*
 * @lc app=leetcode.cn id=692 lang=javascript
 *
 * [692] 前K个高频单词
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {
  const map = {};
  const result = [];

  for (const word of words) {
    if (!map[word]) map[word] = 0;
    map[word]++;
  }

  const heap = createHeap();

  for (const [word, count] of Object.entries(map)) {
    heap.push({ word, count });
  }

  for (let i = 0; i < k; i++) {
    const word = heap.pop().word;
    result.push(word);
  }

  return result;
};

const compareValue = (a, b) => {
  if (a.count === b.count) {
    return b.word.localeCompare(a.word);
  }

  return a.count - b.count;
};

const createHeap = () => {
  const data = [];

  function swim(i) {
    let par = 0;
    const t = data[i];

    while (i > 0) {
      par = Math.floor((i - 1) / 2);

      if (compareValue(data[par], t) > 0) break;

      data[i] = data[par];
      i = par;
    }

    data[i] = t;
  }

  function sink(i) {
    let j = 0;
    const t = data[i];

    while ((j = i * 2 + 1) < data.length) {
      if (j < data.length - 1 && compareValue(data[j + 1], data[j]) > 0) {
        j++;
      }

      if (compareValue(t, data[j]) > 0) break;

      data[i] = data[j];
      i = j;
    }

    data[i] = t;
  }

  const push = (value) => {
    data.push(value);
    swim(data.length - 1);
  };
  const pop = () => {
    const retVal = data[0];
    data[0] = data[data.length - 1];
    data.length = data.length - 1;
    sink(0);

    return retVal;
  };

  return {
    push,
    pop,
  };
};
// @lc code=end
