/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let slow = head;
  let fast = head;

  while (n > 0) {
    fast = fast.next;
    n--;
  }

  if (fast == null) {
    // 如果此时快指针走到头了，
    // 说明倒数第 n 个节点就是第一个节点
    return head.next;
  }

  let prev = slow;

  while (fast) {
    prev = slow;
    slow = slow.next;
    fast = fast.next;
  }

  prev.next = slow.next;

  return head;
};
// @lc code=end
