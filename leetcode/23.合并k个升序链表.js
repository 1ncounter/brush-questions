/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个升序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (lists.length === 0) return null;

  const dummy = new ListNode();
  let tail = dummy;

  const pq = createHeap((a, b) => a.val - b.val);

  for (const list of lists) {
    if (list) pq.push(list);
  }

  while (!pq.isEmpty()) {
    let cur = pq.pop();

    tail.next = cur;
    tail = tail.next;
    cur = cur.next;

    if (cur) {
      pq.push(cur);
    }
  }

  tail.next = null;

  return dummy.next;
};

function createHeap(compareValue) {
  const data = [];

  function swim(i) {
    let par = 0;
    const t = data[i];

    while (i > 0) {
      par = Math.floor((i - 1) / 2);

      if (compareValue(data[par], t) < 0) break;

      data[i] = data[par];
      i = par;
    }

    data[i] = t;
  }

  function sink(i) {
    let j = 0;
    const t = data[i];

    while ((j = i * 2 + 1) < data.length) {
      if (j < data.length - 1 && compareValue(data[j], data[j + 1]) > 0) {
        j++;
      }

      if (compareValue(t, data[j]) < 0) break;

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
    if (data.length === 0) return;

    const retVal = data[0];
    data[0] = data[data.length - 1];
    data.length = data.length - 1;
    if (data.length > 1) sink(0);

    return retVal;
  };
  const peek = () => {
    return data[0];
  };
  const isEmpty = () => {
    return data.length === 0;
  };

  return {
    push,
    pop,
    peek,
    isEmpty,
    get size() {
      return data.length;
    },
  };
}
// @lc code=end
