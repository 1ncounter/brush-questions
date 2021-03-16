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
// var reverseKGroup = function (head, k) {
//   // 递归
//   if (!head) return null;

//   let a = head;
//   let b = head;

//   for (let i = 0; i < k; i++) {
//     // 不足 k 个，不需要反转，base case
//     if (b == null) return head;
//     b = b.next;
//   }

//   const [newHead] = reverse(a, b);
//   a.next = reverseKGroup(b, k);
//   return newHead;
// };

// function reverse(head, tail) {
//   let cur = head;
//   let prev = null;

//   while (cur !== tail) {
//     let temp = cur.next;
//     cur.next = prev;
//     prev = cur;
//     cur = temp;
//   }

//   return [head, tail];
// }

var reverseKGroup = function (head, k) {
  const dummy = new ListNode();
  let tail = dummy;
  // 新建链表用来存储k个节点后反转
  const temp = new ListNode();
  let tempTail = temp;

  let len = 0;

  while (head) {
    let back = head.next;

    // 加入存储链表
    head.next = null;
    tempTail.next = head;
    tempTail = tempTail.next;
    len++;

    if (len === k) {
      const retail = temp.next;
      const reHead = reverse(temp.next);

      tail.next = reHead;
      tail = retail;

      // 重置存储链表
      len = 0;
      temp.next = null;
      tempTail = temp;
    }

    head = back;
  }

  if (len > 0) {
    let p = temp.next;

    while (p) {
      tail.next = p;
      tail = tail.next;
      p = p.next;
    }
  }

  tail.next = null;

  return dummy.next;
};

function reverse(head) {
  const dummy = new ListNode();

  let p = head;
  while (p) {
    const temp = p.next;

    p.next = dummy.next;
    dummy.next = p;
    p = temp;
  }

  return dummy.next;
}
// @lc code=end
