/**
 * 最大并发数 / JS限流调度器
 */
class Scheduler {
  private queue: Array<() => Promise<void>> = [];
  private count: number = 0;

  constructor(private cap: number = 2) {}

  async add(func: () => Promise<void>): Promise<void> {
    const wrapper = this.runWrapper(func);

    if (this.count >= 2) {
      this.queue.unshift(wrapper);
    } else {
      this.count++;
      wrapper();
    }
  }

  runWrapper(func: () => Promise<void>) {
    return async () => {
      await func();

      if (this.queue.length > 0) {
        const nextFunc = this.queue.pop();
        nextFunc();
      } else {
        this.count--;
      }
    };
  }
}
