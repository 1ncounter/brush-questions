/*
 * @lc app=leetcode.cn id=707 lang=javascript
 *
 * [707] 设计链表
 */

// @lc code=start
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * Initialize your data structure here.
 */
var MyLinkedList = function () {
  this.dummy = new ListNode();
  this.tail = this.dummy;
  this.length = 0;
};

MyLinkedList.prototype.getPrevNode = function (index) {
  let front = this.dummy.next;
  let back = this.dummy;

  let i = 0;

  while (i < index && front) {
    back = front;
    front = front.next;
    i++;
  }

  return back;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index > this.length - 1) return -1;

  const prev = this.getPrevNode(index);

  return prev.next.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const node = new ListNode(val);

  node.next = this.dummy.next;
  this.dummy.next = node;

  if (this.tail === this.dummy) {
    this.tail = node;
  }

  this.length++;
};

/**
 * Append a node of value val to the last element of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  const node = new ListNode(val);

  node.next = this.tail.next;
  this.tail.next = node;
  this.tail = node;

  this.length++;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index > this.length) return;

  if (index === this.length) {
    this.addAtTail(val);
  } else if (index < 0) {
    this.addAtHead(val);
  } else {
    const prev = this.getPrevNode(index);
    const node = new ListNode(val);

    node.next = prev.next;
    prev.next = node;

    this.length++;
  }
};

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index > this.length - 1) return;

  const prev = this.getPrevNode(index);

  // 删除最后一个节点
  if (prev.next === this.tail) {
    this.tail = prev;
  }

  prev.next = prev.next.next;
  this.length--;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end
