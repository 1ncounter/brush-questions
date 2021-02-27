/*
 * @lc app=leetcode.cn id=752 lang=javascript
 *
 * [752] 打开转盘锁
 */

// @lc code=start
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  if (deadends.includes('0000')) return -1;

  const visited = new Set([...deadends]);

  const queue = [];
  queue.unshift([0, 0, 0, 0]);

  let step = 0;

  while (queue.length) {
    let len = queue.length;

    while (len > 0) {
      const item = queue.pop();
      const str = item.join('');

      if (str === target) {
        return step;
      }

      /* 将一个节点的未遍历相邻节点加入队列 */
      for (let i = 0; i < item.length; i++) {
        const up = plusOne(item, i);
        const upStr = up.join('');
        if (!visited.has(upStr)) {
          queue.unshift(up);
          visited.add(upStr);
        }

        const down = minusOne(item, i);
        const downStr = down.join('');
        if (!visited.has(downStr)) {
          queue.unshift(down);
          visited.add(downStr);
        }
      }

      len--;
    }

    step++;
  }

  return -1;
};

// 将 s[j] 向上拨动一次
function plusOne(s, j) {
  const ch = [...s];

  if (ch[j] === 9) {
    ch[j] = '0';
  } else {
    ch[j] = ch[j] + 1;
  }

  return ch;
}

// 将 s[i] 向下拨动一次
function minusOne(s, j) {
  const ch = [...s];

  if (ch[j] === 0) {
    ch[j] = 9;
  } else {
    ch[j] = ch[j] - 1;
  }

  return ch;
}
// @lc code=end
