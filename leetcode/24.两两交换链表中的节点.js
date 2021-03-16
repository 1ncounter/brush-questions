/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  // 第一种思路 可以两个节点为一组进行交换 然后迭代
  // 第二种思路 可以把链表拆分为奇偶两个链表再交换顺序合并

  const dummy = new ListNode();
  let tail = dummy;

  while (head && head.next) {
    let temp = head.next.next;

    tail.next = head.next;
    head.next.next = head;
    head.next = temp;
    tail = tail.next.next;

    head = temp;
  }

  if (head && !head.next) {
    tail.next = head;
    tail = tail.next;
  }

  tail.next = null;

  return dummy.next;
};
// @lc code=end
