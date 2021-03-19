/**
 * https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md
 * https://juejin.cn/post/6850418113859551239
 */
interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = 'hello!';

  async delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: 'delay',
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: 'set-message',
    };
  }
}

type asyncMethod<T, U> = (input: T) => Action<U>;
type syncMethod<T, U> = (action: T) => Action<U>;

// 将非函数属性去掉
type FuncName<T> = { [F in keyof T]: T[F] extends Function ? F : never }[keyof T];
// 获取值为函数的 key value 对
type Functions = Pick<EffectModule, FuncName<EffectModule>>;

// 解Promise、Action
type UnPromisify<T> = T extends Promise<infer U> ? U : T;
type UnAction<T> = T extends Action<infer U> ? U : T;

type Connect = (
  module: EffectModule
) => {
  [K in keyof Functions]: (
    // Parameters<(input: string) => any> => [input: string]
    // Parameters<(input: string)> => any>[number] => string 数组取值
    input: UnAction<UnPromisify<Parameters<Functions[K]>[number]>>
  ) => Action<UnPromisify<ReturnType<EffectModule[K]>>['payload']>;
};

const connect: Connect = (m) => ({
  delay: (input: number) => ({
    type: 'delay',
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: 'set-message',
    payload: input.getMilliseconds(),
  }),
});

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};

export const connected: Connected = connect(new EffectModule());
