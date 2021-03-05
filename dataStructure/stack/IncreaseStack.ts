import Stack from './Stack';

class IncreaseStack<T> extends Stack<T> {
  push(value: T) {
    while (this.length && this.peek() > value) {
      this.pop();
    }
    return this.data.push(value);
  }
}

export default IncreaseStack;
