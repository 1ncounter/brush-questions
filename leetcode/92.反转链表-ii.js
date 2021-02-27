/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
  if (head === null) return head;

  let cur = head;
  let prev = null;

  while (m > 1) {
    prev = cur;
    cur = cur.next;
    m--;
    n--;
  }

  let con = prev;
  let tail = cur;

  while (n > 0) {
    // 1 -> 2 -> 3 -> 4
    // 1 -> 2 <- 3 -> 4
    //      |    |    |
    //    prev  cur  temp
    let temp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = temp;

    n--;
  }

  // 1 -> 2 <- 3 <- 4 <- 5
  // |    |         |    |
  //con  tail      prev cur
  if (con) {
    con.next = prev;
  } else {
    head = prev;
  }

  tail.next = cur;

  return head;
};

// var reverseBetween = function (head, m, n) {
//   if (!head) return null;

//   let tail;

//   function reverseN(head, n) {
//     if (n === 1) {
//       tail = head.next;
//       return head;
//     }

//     const last = reverseN(head.next, n - 1);

//     head.next.next = head;
//     head.next = tail;

//     return last;
//   }

//   if (m == 1) {
//     return reverseN(head, n);
//   }

//   head.next = reverseBetween(head.next, m - 1, n - 1);

//   return head;
// };

// @lc code=end
