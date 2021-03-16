class ListNode<T> {
  value: T;
  next: ListNode<T> = null;

  constructor(value?: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  /**
   * 假头节点 Dummy Head
   */
  dummy: ListNode<T>;
  tail: ListNode<T>;
  length: number = 0;

  constructor() {
    this.dummy = this.tail = new ListNode();
  }

  addAtTail(value: T) {
    const node = new ListNode<T>(value);

    this.tail.next = node;
    this.tail = this.tail.next;
    this.length++;
  }

  addAtHead(value: T) {
    const node = new ListNode<T>(value);

    const temp = this.dummy.next;
    node.next = temp;
    this.dummy.next = node;

    if (this.dummy === this.tail) {
      this.tail == temp;
    }

    this.length++;
  }

  private getPrevNode(index: number) {
    let front = this.dummy.next;
    let back = this.dummy;

    for (let i = 0; i < this.length && front !== null; i++) {
      back = front;
      front = front.next;
    }

    return back;
  }

  get(index: number) {
    if (index < 0 || index > this.length - 1) return null;

    const prev = this.getPrevNode(index);

    return prev.next.value;
  }

  addAtIndex(index: number, value: T) {
    if (index < 0 || index > this.length - 1) return;

    const node = new ListNode<T>(value);
    const prev = this.getPrevNode(index);

    node.next = prev.next;
    prev.next = node;
    this.length++;
  }

  deleteAtIndex(index: number) {
    if (index < 0 || index > this.length - 1) return;

    const prev = this.getPrevNode(index);

    if (this.tail === prev.next) this.tail = prev;

    prev.next = prev.next.next;
    this.length--;
  }
}

export default LinkedList;
