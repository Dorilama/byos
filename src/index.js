/**
 * @type {import(".").noop}
 */
export const noop = () => {};

/**
 * @type {import(".").createUsePeek}
 */
export const createUsePeek = (fns) => (signal) => {
  let untracked = fns.toValue(signal);
  const stop = fns.effect(() => {
    untracked = fns.toValue(signal);
  }, [signal]);
  const peek = () => untracked;
  return [peek, stop];
};

/**
 * @type {import(".").createSignalFunctions}
 */
export function createSignalFunctions(fns) {
  return {
    ...fns,
    computedCleanup: fns.computedCleanup || noop,
    usePeek: fns.usePeek || createUsePeek(fns),
  };
}
