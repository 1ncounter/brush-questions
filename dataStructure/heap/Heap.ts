export type CompareFunction<T> = (a: T, b: T) => number;

class Heap<T> {
  data: T[] = [];

  constructor(public compareFunc: CompareFunction<T>) {}

  // 下沉
  private sink(i: number) {
    let j = 0;
    const data = this.data;
    const t = data[i];
    const len = this.size;

    while ((j = 2 * i + 1) < len) {
      if (j < len - 1 && this.compareFunc(data[j], data[j + 1]) > 0) {
        j++;
      }

      if (this.compareFunc(t, data[j]) < 0) break;

      data[i] = data[j];
      i = j;
    }

    data[i] = t;
  }

  // 上浮
  private swim(i: number) {
    const data = this.data;
    const t = data[i];
    let par = 0;

    while (i > 0) {
      par = Math.floor((i - 1) / 2);

      if (this.compareFunc(data[par], t) < 0) break;

      data[i] = data[par];
      i = par;
    }

    data[i] = t;
  }

  push(value: T) {
    this.data.push(value);
    this.swim(this.size - 1);
  }

  pop() {
    if (this.size === 0) return;

    const retVal = this.data[0];

    this.data[0] = this.data[this.size - 1];
    this.data.length = this.size - 1;
    if (this.size > 1) this.sink(0);

    return retVal;
  }

  peek() {
    return this.data[0];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  get size() {
    return this.data.length;
  }
}

export default Heap;
