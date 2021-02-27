/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (!head) return null;

  let a = head;
  let b = head;

  for (let i = 0; i < k; i++) {
    // 不足 k 个，不需要反转，base case
    if (b == null) return head;
    b = b.next;
  }

  const [newHead] = reverse(a, b);
  a.next = reverseKGroup(b, k);
  return newHead;
};

function reverse(head, tail) {
  let cur = head;
  let prev = null;

  while (cur !== tail) {
    let temp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = temp;
  }

  return [head, tail];
}
// @lc code=end
