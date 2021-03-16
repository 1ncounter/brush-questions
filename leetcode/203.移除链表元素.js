/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  let dummy = new ListNode();
  let tail = dummy;

  while (head) {
    if (head.val !== val) {
      tail.next = head;
      tail = tail.next;
    }

    head = head.next;
  }

  tail.next = null;

  return dummy.next;
};
// @lc code=end
