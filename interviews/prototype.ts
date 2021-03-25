/**
 * 4.3.5 prototype
 * object that provides shared properties for other objects
 * 在规范里，prototype 被定义为：给其它对象提供共享属性的对象。
 */

/**
 * 所有 object 对象都有一个隐式引用
 * Every object has an implicit reference (called the object's prototype)
 * 规范中明确描述了所有对象，都有一个隐式引用，它被称之为这个对象的 prototype 原型。
 *
 * ECMAScript 规范描述 prototype 是一个隐式引用，但之前的一些浏览器，已经私自实现了 __proto__ 这个属性，
 * 使得可以通过 obj.__proto__ 这个显式的属性访问，访问到被定义为隐式属性的 prototype。
 * __proto__ 属性既不能被 for in 遍历出来，也不能被 Object.keys(obj) 查找出来。
 */
const obj1: any = {};
const prototype = { is: 'prototype' };

Object.setPrototypeOf(obj1, prototype);

console.log(Object.getPrototypeOf(obj1)); // { is: 'prototype' }

/**
 * a prototype may have a non-null implicit reference to its prototype,
 * and so on; this is called the prototype chain.
 *
 * 构成了对象的原型的原型的原型的链条，直到某个对象的隐式引用为 null，整个链条终止。
 *
 * 如此，用户以为自己在访问对象的属性，其实它是在整条原型链上查找。
 */

console.log(obj1.is); // 1

/**
 * JavaScript 只是其中一个 prototype-based inheritance 的语言，其它同样包含 prototype 概念的语言，
 * 并不像 JS 那样通过 constructor 和 prototype 构造对象和关联其原型。
 *
 * 所谓的原型继承，就是指设置某个对象为另一个对象的原型（塞进该对象的隐式引用位置）。
 */

/**
 * 显式原型继承，就是指我们亲自将某个对象设置为另一个对象的原型。
 * 除了 Object.setPrototypeOf 方法以外，还有另一种途径。即是通过 Object.create 方法，直接继承另一个对象。
 *
 * Object.setPropertyOf 和 Object.create 的差别在于：
 * 1）Object.setPropertyOf，给我两个对象，我把其中一个设置为另一个的原型。
 * 2）Object.create，给我一个对象，它将作为我创建的新对象的原型。
 */
const obj2 = Object.create(prototype);

console.log(obj2.is);

/**
 * 隐式原型继承
 *
 * 想要得到一个包含了数据、方法以及关联原型三个组成部分的丰满对象，一个相对具体的步骤如下：
 * 1）创建空对象
 * const obj = {}
 * 2）设置该空对象的原型为另一个对象或者 null
 * Object.setPropertyOf(Object.prototype)
 * 3）填充该对象，增加属性或方法。
 * obj.name = 'name'
 *
 * 如果要让用户无感知的完成创建对象、原型继承和属性初始化的过程。
 * 1）我们将某些函数称之为 constructor，专门用来做属性初始化。
 * function User(name) {
 *   this.name = name;
 * }
 * 2）我们约定，constructor 函数，有一个特殊属性 prototype
 * User.prototype = Object.create(Object.prototype)
 * 3）让用户使用 new 关键字，去创建新对象
 * const user = new User('name')
 * 4）在内部，我们偷偷做创建对象，关联原型和属性初始化等一系列过程。
 */

function User(name: string) {
  this.name = name;
}

const user = new User('name');

console.log(user.constructor === User);

/**
 * 不管是隐式原型继承，还是显式原型继承，只是外在形态，核心是具备设置对象的隐式引用的功能。
 * 它们之间具备一定互操作性，也就是说，拥有其中一个，可以实现另一个的部分行为。
 */

/**
 * 从隐式原型继承中剥离出 Object.create 方法
 */
const create = (proto: any) => {
  let Noop = () => {};
  Noop.prototype = proto;

  return new Noop();
};

/**
 * 用显式原型继承的方式完成 constructor 初始化过程
 */
const createInstance = (Constructor: Function, ...args: any[]) => {
  const obj = Object.create(Constructor.prototype);
  Constructor.apply(obj, args);

  return obj;
};
