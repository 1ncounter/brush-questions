/**
 * 下面是一个海鸥程序，鸟群合并则变成了一个更大的鸟群，繁殖则增加了鸟群的数量，增加的数量就是它们繁殖出来的海鸥的数量。
 */
class Flock {
  constructor(public seagulls: number) {}

  conjoin(other: Flock) {
    this.seagulls += other.seagulls;
    return this;
  }

  breed(other: Flock) {
    this.seagulls = this.seagulls * other.seagulls;
    return this;
  }
}

const flock1 = new Flock(4);
const flock2 = new Flock(2);
const flock3 = new Flock(0);

const result1 = flock1.conjoin(flock3).breed(flock2).conjoin(flock1.breed(flock2)).seagulls;

console.log(result1);

const conjoin = function (flock_x: number, flock_y: number) {
  return flock_x + flock_y;
};
const breed = function (flock_x: number, flock_y: number) {
  return flock_x * flock_y;
};

const flock_a = 4;
const flock_b = 2;
const flock_c = 0;

const result2 = conjoin(breed(flock_b, conjoin(flock_a, flock_c)), breed(flock_a, flock_b));

console.log(result2);

var add = function (x: number, y: number) {
  return x + y;
};
var multiply = function (x: number, y: number) {
  return x * y;
};

add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b));
// =>
add(multiply(flock_b, flock_a), multiply(flock_a, flock_b));
// =>
multiply(flock_b, add(flock_a, flock_a));
multiply(flock_a, add(flock_b, flock_b));

// 结合律（assosiative）
// add(add(x, y), z) == add(x, add(y, z));

// 交换律（commutative）
// add(x, y) == add(y, x);

// 同一律（identity）
// add(x, 0) == x;

// 分配律（distributive）
// multiply(x, add(y,z)) == add(multiply(x, y), multiply(x, z));
