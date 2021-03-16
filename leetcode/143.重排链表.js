/*
 * @lc app=leetcode.cn id=143 lang=javascript
 *
 * [143] 重排链表
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  if (!head) return null;

  const mid = findMidNode(head);

  // 拆分链表
  let back = mid.next;
  mid.next = null;

  let l1 = head;
  let l2 = reverse(back);

  while (l1 && l2) {
    let temp1 = l1.next;
    let temp2 = l2.next;

    l1.next = l2;
    l2.next = temp1;

    l1 = temp1;
    l2 = temp2;
  }
};

function findMidNode(head) {
  const dummy = new ListNode();
  dummy.next = head;

  let front = head;
  let back = head;
  let prev = dummy;

  while (front && front.next) {
    front = front.next.next;
    back = back.next;
    prev = prev.next;
  }

  return front ? back : prev;
}

function reverse(head) {
  const dummy = new ListNode();

  while (head) {
    let temp = head.next;

    head.next = dummy.next;
    dummy.next = head;
    head = temp;
  }

  return dummy.next;
}
// @lc code=end
