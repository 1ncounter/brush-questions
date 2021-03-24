function compose(...fns: Function[]) {
  if (fns.length === 0) return <T>(args: T) => args;
  if (fns.length === 1) return fns[0];

  return fns.reduceRight((a, b) => (...args: any[]) => b(a.apply(null, args)));
}
