import Queue from './Queue';

/**
 * 循环队列是一个书本上非常经典的关于队列的例子
 * 在工程实践中也有很多运用，比如 Ring Buffer、生产者消费者队列。
 */
class CircularQueue<T> extends Queue<T> {
  head = 0;
  tail = 0;

  constructor(public capacity: number) {
    super();
  }

  isFull(): boolean {
    return this.length === this.capacity;
  }
}
