import Stack from './Stack';

class DecreaseStack<T> extends Stack<T> {
  constructor() {
    super();
  }

  push(value: T) {
    while (this.length && this.peek() < value) {
      this.pop();
    }
    return this.data.push(value);
  }
}

export default DecreaseStack;
