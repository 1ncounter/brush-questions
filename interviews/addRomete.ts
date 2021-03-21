/**
 * 假设本地机器无法做加法，需要通过远程请求让服务器来实现
 */
async function addRemote(a: number, b: number) {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(a + b), 1000);
  });
}

const cache = new Map<string, number>();

// 请实现本地的add方法，调用addRomete，能以最优的时间实现输入数字的加法
async function add(...args: number[]) {
  if (args.length === 0) return;
  if (args.length === 1) return args[0];

  // promise 串行解法
  // let result = args[0];

  // for (let i = 1; i < args.length; i++) {
  //   const key1 = `${result}${args[i]}`;

  //   if (cache.has(key1)) {
  //     result = cache.get(key1)!;
  //   } else {
  //     result = await addRemote(result, args[i]);
  //     cache.set(key1, result);
  //   }
  // }

  // return result;

  // 假如能保证下游承受力足够 可同时接受多个请求
  // 可以将参数多个分组 mapReduce的方法
  const combined = [];

  let left = 0;
  while (left < args.length) {
    const promise = new Promise<number>((resolve) => {
      const ary = args.slice(left, left + 2);

      if (ary.length === 1) {
        resolve(ary[0]);
      } else {
        resolve(addRemote(...ary));
      }
    });

    combined.push(promise);
    left += 2;
  }

  return Promise.all(combined).then((res: number[]) => {
    return add(...res);
  });
}

// 运行示例`
async function main() {
  console.time("1 + 2");
  console.log(await add(1, 2));
  console.timeEnd("1 + 2");

  console.time("3 + 5 + 2");
  console.log(await add(3, 5, 2));
  console.timeEnd("3 + 5 + 2");
}

main();
