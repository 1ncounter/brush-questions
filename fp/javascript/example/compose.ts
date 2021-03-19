// const pipe = () => { // 从左往右执行函数组合
//   const args = [].slice.apply(arguments)
//   return function (value) {
//       return args.reduce((acc, fn) => fn(acc), value)
//   }
// }
// const compose = () => { // 从右往左执行函数（右侧函数的输出为左侧函数的输入）
//   const args = [].slice.apply(arguments)
//   return function (value) {
//       return args.reduceRight((acc, fn) => fn(acc), value)
//   }
// }

import { curry, compose, pipe, reduce } from 'ramda';

var toUpperCase = function (x: string) {
  return x.toUpperCase();
};
var exclaim = function (x: string) {
  return x + '!';
};

// var shout = function(x){
//   return exclaim(toUpperCase(x));
// };
// var shout = compose(exclaim, toUpperCase);
var shout = pipe(toUpperCase, exclaim);

console.log(shout('send in the clowns'));

var head = function (x: string[]) {
  return x[0];
};
var reverse = reduce(function (acc: string[], x: string) {
  return [x].concat(acc);
}, []);
var last = compose(head, reverse);

console.log(last(['jumpkick', 'roundhouse', 'uppercut']));

const lastUpper = compose(toUpperCase, compose(head, reverse));
// const lastUpper = compose(compose(toUpperCase, head), reverse);
// const lastUpper = compose(toUpperCase, head, reverse);

console.log(lastUpper(['jumpkick', 'roundhouse', 'uppercut']));

var loudLastUpper = compose(exclaim, toUpperCase, head, reverse);

console.log(loudLastUpper(['jumpkick', 'roundhouse', 'uppercut']));

/**
 * pointfree: pointfree 模式指的是，永远不必说出你的数据。
 */

/**
 * debug
 */
var trace = curry(function (tag, x) {
  console.log(tag, x);
  return x;
});
