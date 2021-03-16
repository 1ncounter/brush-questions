/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
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
var deleteDuplicates = function (head) {
  const dummy = new ListNode(null);
  let tail = dummy;
  let isDup = false;

  while (head) {
    isDup = false;

    while (head.next && head.val == head.next.val) {
      isDup = true;
      head = head.next;
    }

    if (!isDup) {
      tail.next = head;
      tail = tail.next;
    }

    head = head.next;
  }

  tail.next = null;

  return dummy.next;
};
// @lc code=end
