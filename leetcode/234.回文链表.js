/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// var isPalindrome = function (head) {
//   if (!head) return null;

//   let left = head;

//   function reverse(right) {
//     if (!right) return true;

//     let res = reverse(right.next);

//     // 后序遍历
//     res = res && left.val === right.val;
//     left = left.next;

//     return res;
//   }

//   return reverse(head);
// };

var isPalindrome = function (head) {
  if (!head) return null;

  let slow = head;
  let fast = head;

  let prev = head;

  // 找到中点
  while (fast && fast.next) {
    fast = fast.next.next;

    // 将slow反转
    let temp = slow.next;
    slow.next = prev;
    prev = slow;
    slow = temp;
  }
  // 个数为奇数的情况
  if (fast) {
    slow = slow.next;
  }

  while (slow && prev) {
    if (slow.val !== prev.val) return false;

    slow = slow.next;
    prev = prev.next;
  }

  return true;
};
// @lc code=end
