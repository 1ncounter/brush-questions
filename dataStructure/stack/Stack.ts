class Stack<T> {
  data: T[] = [];

  pop(): T {
    return this.data.pop();
  }

  push(value: T) {
    return this.data.push(value);
  }

  peek(): T {
    return this.data[this.data.length - 1];
  }

  toString(): string {
    return `[ ${this.data.join(', ')} ]`;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  get length(): number {
    return this.data.length;
  }
}

export default Stack;
