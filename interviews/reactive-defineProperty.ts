function defineReactive(target, key, value) {
  const property = Object.getOwnPropertyDescriptor(target, key);

  if (property && !property.configurable) return;

  const getter = property && property.get;
  const setter = property && property.set;

  // #7981: for accessor properties without setter
  if (getter && !setter) return;

  if (arguments.length === 2) {
    value = target[key];
  }

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get: function reactiveGetter() {
      const result = getter ? getter.call(target) : value;

      return result;
    },
    set: function reactiveSetter(newVal) {
      const oldValue = getter ? getter.call(target) : value;

      if (newVal === oldValue) return;

      if (setter) {
        setter.call(target, newVal);
      } else {
        value = newVal;
      }

      // dep.notify
    },
  });
}
