/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  const dummy = new ListNode(null);
  let tail = dummy;

  while (l1 || l2) {
    if (l1 || (l2 && l1.val > l2.val)) {
      tail.next = l2;
      l2 = l2.next;
    } else {
      tail.next = l1;
      l1 = l1.next;
    }

    tail = tail.next;
  }

  tail.next = null;

  return dummy.next;
};
// @lc code=end
