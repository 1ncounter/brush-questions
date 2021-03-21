const delay = (fn, time = 0) => (value) => setTimeout(() => fn(value), time);
const isFunction = (obj) => typeof obj === 'function';
const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';
const isThenable = (obj) => (isObject(obj) || isFunction(obj)) && 'then' in obj;
const isPromise = (promise) => promise instanceof MyPromise;

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function notify(callback, state, result) {
  const { onFulfilled, onRejected, resolve, reject } = callback;

  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
    } else if (state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result);
    }
  } catch (error) {
    reject(error);
  }
}

const notifyAll = delay((promise) => {
  const { callbacks, state, result } = promise;

  while (callbacks.length) notify(callbacks.shift(), state, result);
});

function transition(promise, state, result) {
  if (promise.state !== PENDING) return;
  promise.state = state;
  promise.result = result;

  notifyAll(promise);
}

function checkValue(promise, value, onFulfilled, onRejected) {
  if (value === promise) {
    const reason = new TypeError('cannot fulfill promise');
    return onRejected(reason);
  }

  if (isPromise(value)) {
    return value.then(onFulfilled, onRejected);
  }

  if (isThenable(value)) {
    try {
      let then = value.then;
      if (isFunction(then)) {
        return new Promise(then.bind(value)).then(onFulfilled, onRejected);
      }
    } catch (error) {
      return onRejected(error);
    }
  }

  onFulfilled(value);
}

class MyPromise {
  state = PENDING;
  callbacks = [];

  constructor(callback) {
    let ignore = false;

    const onFulfilled = (value) => transition(this, FULFILLED, value);
    const onRejected = (reason) => transition(this, REJECTED, reason);

    const resolve = (value) => {
      if (ignore) return;
      ignore = true;

      checkValue(this, value, onFulfilled, onRejected);
    };

    const reject = (reason) => {
      if (ignore) return;
      ignore = true;

      onRejected(reason);
    };

    try {
      callback(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.callbacks.push({ onFulfilled, onRejected, resolve, reject });

      if (this.state !== PENDING) notifyAll(this);
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static all(promises = []) {
    return new MyPromise((resolve, reject) => {
      const result = new Array(promises.length);

      let count = 0;
      const collectValue = (index) => (value) => {
        result[index] = value;
        count += 1;
        count === promises.length && resolve(result);
      };

      promises.forEach((promise, index) => {
        if (isPromise(promise)) {
          promise.then(collectValue(index), reject);
        } else {
          resolve(collectValue(index)(promise));
        }
      });
    });
  }

  static race(promises = []) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        if (isPromise(promise)) {
          promise.then(resolve, reject);
        } else {
          resolve(promise);
        }
      });
    });
  }
}
