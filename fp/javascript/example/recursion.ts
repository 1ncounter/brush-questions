/**
 * 斐波那契数列 0 1 1 2 3 5 8 13....
 */
function fibonaci(n: number) {
  if (n < 2) return n;

  let prev = 0;
  let cur = 1;

  for (let i = 3; i <= n; i++) {
    let temp = cur;
    cur = prev + cur;
    prev = temp;
  }

  return cur;
}

function fibonaci2(n: number) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  return fibonaci2(n - 1) + fibonaci2(n - 2);
}
