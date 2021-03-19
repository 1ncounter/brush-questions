/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
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
var sortList = function (head) {
  return quickSort(head);
};

function partition(head) {}

function quickSort(head) {
  if (!head || !head.next) return head;
}

function findMiddle(head) {
  const dummy = new ListNode();
  dummy.next = head;

  let front = head;
  let back = head;
  let prev = dummy;

  /**
   *  1 -> 2 -> 3 -> 4 -> 5
   *            |back     |front
   *  1 -> 2 -> 3 -> 4 -> null
   *      |prev           |front
   */
  while (front && front.next) {
    front = front.next.next;
    back = back.next;
    prev = prev.next;
  }

  return front ? back : prev;
}

function mergeSort(head) {
  if (!head || !head.next) return head;

  // 把现有链表拆成两条
  const mid = findMiddle(head);
  const back = mid.next;
  mid.next = null;

  let left = mergeSort(head);
  let right = mergeSort(back);

  const dummy = new ListNode();
  let tail = dummy;

  // 合并两条有序链表
  while (left || right) {
    if (!right || (left && left.val < right.val)) {
      tail.next = left;
      tail = tail.next;
      left = left.next;
    } else {
      tail.next = right;
      tail = tail.next;
      right = right.next;
    }
  }

  tail.next = null;

  return dummy.next;
}
// @lc code=end
