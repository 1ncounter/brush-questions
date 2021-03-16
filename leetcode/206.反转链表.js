/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
var reverseList = function (head) {
  const dummy = new ListNode();

  while (head) {
    let temp = head.next;

    head.next = dummy.next;
    dummy.next = head;
    head = temp;
  }

  // const reverse = (head) => {
  //   if (!head) return;

  //   let temp = head.next;
  //   head.next = dummy.next;
  //   dummy.next = head;

  //   reverse(temp);
  // };

  // reverse(head);

  return dummy.next;
};
// @lc code=end
