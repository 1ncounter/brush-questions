/*
 * @lc app=leetcode.cn id=295 lang=javascript
 *
 * [295] 数据流的中位数
 */

// @lc code=start
/**
 * initialize your data structure here.
 */
var MedianFinder = function () {
  this.loHeap = createHeap((a, b) => b - a);
  this.hiHeap = createHeap((a, b) => a - b);
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  this.loHeap.push(num);
  this.hiHeap.push(this.loHeap.pop());

  if (this.loHeap.size < this.hiHeap.size) {
    this.loHeap.push(this.hiHeap.pop());
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.loHeap.size === this.hiHeap.size) {
    return (this.hiHeap.peek() + this.loHeap.peek()) / 2;
  }

  return this.loHeap.peek();
};

function createHeap(compareValue) {
  const data = [];

  function swim(i) {
    let par = 0;
    const t = data[i];

    while (i > 0) {
      par = Math.floor((i - 1) / 2);

      if (compareValue(data[par], t) < 0) break;

      data[i] = data[par];
      i = par;
    }

    data[i] = t;
  }

  function sink(i) {
    let j = 0;
    const t = data[i];

    while ((j = i * 2 + 1) < data.length) {
      if (j < data.length - 1 && compareValue(data[j], data[j + 1]) > 0) {
        j++;
      }

      if (compareValue(t, data[j]) < 0) break;

      data[i] = data[j];
      i = j;
    }

    data[i] = t;
  }

  const push = (value) => {
    data.push(value);
    swim(data.length - 1);
  };
  const pop = () => {
    if (data.length === 0) return;

    const retVal = data[0];
    data[0] = data[data.length - 1];
    data.length = data.length - 1;
    if (data.length > 1) sink(0);

    return retVal;
  };
  const peek = () => {
    return data[0];
  };
  const isEmpty = () => {
    return data.length === 0;
  };

  return {
    push,
    pop,
    peek,
    isEmpty,
    get size() {
      return data.length;
    },
  };
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end
