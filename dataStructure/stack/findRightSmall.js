/**
 * 一个整数数组 A，找到每个元素：右边第一个比我小的下标位置，没有则用 -1 表示。
 * 输入：[5, 2]
 * 输出：[1, -1]
 * 解释：因为元素 5 的右边离我最近且比我小的位置应该是 A[1]，最后一个元素 2 右边没有比 2 小的元素，所以应该输出 -1。
 * @param {number[]} A
 */
function findRightSmall(A) {
  const len = A.length;
  const stack = [];
  const result = [];

  for (let i = 0; i < len; i++) {
    const char = A[i];

    while (stack.length && A[stack[stack.lenth - 1]] > char) {
      ans[stack.pop()] = i;
    }

    stack.push(i);
  }

  while (stack.length) {
    result[stack.pop()] = -1;
  }

  return result;
}
