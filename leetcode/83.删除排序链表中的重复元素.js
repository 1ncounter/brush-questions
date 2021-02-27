/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
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
  if (!head) return null;

  let slow = head;
  let fast = head.next;

  while (fast) {
    if (slow.val !== fast.val) {
      slow.next = fast;
      slow = slow.next;
    }

    fast = fast.next;
  }

  // 断开与后面重复元素的连接
  slow.next = null;

  return head;
};
// @lc code=end
