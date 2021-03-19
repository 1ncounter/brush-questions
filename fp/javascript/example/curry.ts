/**
 * var add = function(x) {
 *   return function(y) {
 *     return x + y;
 *   };
 * };

 * var increment = add(1);
 * var addTen = add(10);

 * increment(2);
 * 3

 * addTen(2);
 * 12
 */
import { curry } from 'ramda';

// 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

const match = curry(function (what: string | RegExp, str: string) {
  return str.match(what);
});

console.log(match(/\s+/g, 'hello world'));

const hasSpaces = match(/\s+/g);
// function(x) { return x.match(/\s+/g) }

console.log(hasSpaces('hello world'));

const filter = curry(function (f, ary: string[]) {
  return ary.filter(f);
});

console.log(filter(hasSpaces, ['tori_spelling', 'tori amos']));

const findSpaces = filter(hasSpaces);

console.log(findSpaces(['tori_spelling', 'tori amos']));
// ["tori amos"]

const replace = curry(function (what: string | RegExp, replacement: string, str: string) {
  return str.replace(what, replacement);
});

const noVowels = replace(/[aeiou]/gi);

const censored = noVowels('*');
// function(x) { return x.replace(/[aeiou]/ig, "*") }

console.log(censored('Chocolate Rain'));
