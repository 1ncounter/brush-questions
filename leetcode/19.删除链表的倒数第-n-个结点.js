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
 * 在原链表前面加上 dummy，变成带假头的链表
 * front 指针从 dummy 开始，走 k 步，然后停下来
 * back 指针指向链表 dummy 假头
 * 然后两个指针再一起走
 * 当 front 指针指向最后一个结点时，back 指针刚好指向倒数第 k 个结点的前驱。
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode();

  dummy.next = head;

  let front = dummy;
  let back = dummy;
  let k = 0;

  while (front && front.next && k < n) {
    front = front.next;
    k++;
  }

  while (front && front.next) {
    front = front.next;
    back = back.next;
  }

  if (k === n) {
    back.next = back.next.next;
  }

  return dummy.next;
};
// @lc code=end
