/*
 * @lc app=leetcode.cn id=969 lang=javascript
 *
 * [969] 煎饼排序
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[]}
 *
 * 1、找到 n 个饼中最大的那个。
 * 2、把这个最大的饼移到最底下。
 * 3、递归调用 pancakeSort(A, n - 1)。
 * base case：n == 1 时，排序 1 个饼时不需要翻转。
 *
 * 如何设法将某块烧饼翻到最后呢？
 * 比如第 3 块饼是最大的，我们想把它换到最后，也就是换到第 n 块。可以这样操作：
 * 1、用锅铲将前 3 块饼翻转一下，这样最大的饼就翻到了最上面。
 * 2、用锅铲将前 n 块饼全部翻转，这样最大的饼就翻到了第 n 块，也就是最后一块。
 */
var pancakeSort = function (arr) {};

function reverse(arr, left, right) {
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
}
// @lc code=end

// var pancakeSort = function(arr) {
//   const res = []

//   const sort = (arr, n) => {
//     if (n === 1) return;

//     let max = 0;
//     let maxIndex = 0

//     for (let i = 0; i < n; i++) {
//       if (arr[i] > max) {
//         max = arr[i];
//         maxIndex = i;
//       }
//     }

//     reverse(arr, 0, maxIndex)
//     res.push(maxIndex + 1)

//     reverse(arr, 0, n - 1)
//     res.push(n)

//     sort(arr, n - 1);
//   }

//   sort(arr, arr.length)
//   return res
// };
