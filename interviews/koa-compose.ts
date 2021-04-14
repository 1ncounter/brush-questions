/**
 * in koa, middlewares will be composed in the callback method
 * const fnMiddleware = compose(this.middleware);
 *
 * the fnMiddleware will be called with context in the handleRequest method
 * return fnMiddleware(ctx).then(handleResponse).catch(onerror);
 */
function compose<T>(middleware: Function[]) {
  return function (context: T, next: (...args: any[]) => Promise<any>) {
    let index = -1;

    function dispatch(i: number) {
      if (i < index)
        return Promise.reject(new Error('next() called multiple times'));

      index = i;

      let fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return dispatch(0);
  };
}
