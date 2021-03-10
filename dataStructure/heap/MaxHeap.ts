class MaxHeap {
  data: number[] = [];

  // 下沉
  private sink(i: number) {
    let j = 0;
    const data = this.data;
    const t = data[i];
    const len = this.size;

    // 如果存在左子节点的话
    while ((j = 2 * i + 1) < len) {
      // 需要在两个后继节点找出最大的值
      // j < len - 1判断是否有右子结点
      // 如果有，并且右子结点更大，那么j指向右子结点
      if (j < len - 1 && data[j] < data[j + 1]) {
        j++;
      }

      if (t < data[j]) {
        // 如果子节点的值大于t，那么t还需要往后移，交换子节点与t的位置
        data[i] = data[j];
        i = j;
      } else {
        // 找到位置 此时t是大于所有的子结点的
        break;
      }
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

      if (data[par] < t) {
        // 如果父结点比t值小 那么向下移动父结点的值。
        data[i] = data[par];
        i = par;
      } else {
        break;
      }
    }

    data[i] = t;
  }

  push(value: number) {
    this.data.push(value);
    this.swim(this.size - 1);
  }

  pop() {
    if (this.size === 0) return;

    const retVal = this.data[0];

    this.data[0] = this.data[this.size - 1];
    this.data.length = this.size - 1;
    this.sink(0);

    return retVal;
  }

  peek() {
    return this.data[0];
  }

  get size() {
    return this.data.length;
  }
}

export default MaxHeap;
