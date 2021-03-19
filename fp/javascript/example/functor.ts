import { curry, compose, prop, identity, add, head, map } from 'ramda';

/**
 * functor 是实现了 map 函数并遵守一些特定规则的容器类型。
 * pointed functor 是实现了 of 方法的 functor。
 */
class Functor<T = any> {
  constructor(public __value: T) {}

  public static of<T>(value: T) {
    return new Functor(value);
  }

  map(f: (value: T) => any) {
    return Functor.of(f(this.__value));
  }
}

// Functor.of(2).map((two) => two + 2);
// Functor.of('flamethrowers').map(function (s) {
//   return s.toUpperCase();
// });

class Maybe<T = any> extends Functor<T> {
  constructor(value: T) {
    super(value);
  }

  static of<T>(value: T) {
    return new Maybe(value);
  }

  isNothing() {
    return this.__value === null || this.__value === undefined;
  }

  map(f: (value: T) => any) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
  }
}

// 练习 1
// ==========
// 使用 _.add(x,y) 和 _.map(f,x) 创建一个能让 functor 里的值增加的函数

const mMap = curry((f, maybe: Maybe) => {
  return maybe.map(f);
});

var ex1 = mMap(add(10));

const f1 = new Maybe(10);

//练习 2
// ==========
// 使用 _.head 获取列表的第一个元素
var xs = Maybe.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);

var ex2 = mMap(head);

// 练习 3
// ==========
// 使用 safeProp 和 _.head 找到 user 的名字的首字母
var safeProp = curry(function (x, o) {
  return Maybe.of(o[x]);
});

var user = { id: 2, name: 'Albert' };

var ex3 = compose(mMap(head), safeProp('name'));

// 练习 4
// ==========
// 使用 Maybe 重写 ex4，不要有 if 语句

// var ex4 = function (n) {
//   if (n) { return parseInt(n); }
// };

var ex4 = function (n: string) {
  return Maybe.of(n).map((n) => parseInt(n));
};
