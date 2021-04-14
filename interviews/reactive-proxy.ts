const isObject = (obj) =>
  Object.prototype.toString.call(obj) === '[object Object]';

function createReactiveObject(target) {
  if (!isObject(target)) return target;

  const baseHandlers = {
    get: function getter(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);

      return result;
    },
    set: function setter(target, key, value, receiver) {
      const oldValue = target[key];
      console.log('oldValue: ', oldValue);
      const result = Reflect.set(target, key, value, receiver);
      console.log(key, ' set value: ', value);
      return result;
    },
    deleteProperty: function deleteProperty(target, key) {
      return Reflect.deleteProperty(target, key);
    },
    has: function has(target, key) {
      return Reflect.has(target, key);
    },
  };

  const proxy = new Proxy(target, baseHandlers);

  return proxy;
}
