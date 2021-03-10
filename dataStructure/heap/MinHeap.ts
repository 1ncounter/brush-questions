class MinHeap {
  data: number[] = [];

  private swim(i: number) {
    const data = this.data;

    let t = data[i];
    let par = 0;

    while (i > 0) {
      par = Math.floor((i - 1) / 2);

      if (data[par] < t) break;

      data[i] = data[par];
      i = par;
    }

    data[i] = t;
  }

  private sink(i: number) {
    let j = 0;
    const data = this.data;
    const len = this.size;
    const t = data[i];

    while ((j = 2 * i + 1) < len) {
      if (j < len - 1 && data[j] > data[j + 1]) {
        j++;
      }

      if (data[j] > t) break;

      data[i] = data[j];
      i = j;
    }

    data[i] = t;
  }

  pop() {
    if (this.size === 0) return;

    const retVal = this.data[0];

    this.data[0] = this.data[this.size - 1];
    this.data.length = this.size - 1;
    this.sink(0);

    return retVal;
  }

  push(value: number) {
    this.data.push(value);
    this.swim(this.size - 1);
  }

  peek() {
    return this.data[0];
  }

  get size() {
    return this.data.length;
  }
}

export default MinHeap;
