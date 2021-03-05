class Queue<T> {
  data: T[] = [];

  enQueue(value: T) {
    return this.data.unshift(value);
  }

  deQueue() {
    return this.data.pop();
  }

  /**
   * 得到队首元素，如果为空，返回null
   */
  front() {
    return this.length ? this.data[0] : null;
  }

  /**
   * 得到队尾元素，如果队列为空，返回null
   */
  rear() {
    return this.length ? this.data[this.length - 1] : null;
  }

  toString() {
    return `[ ${this.data.join(', ')} ]`;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  get length() {
    return this.data.length;
  }
}

export default Queue;
