import { observable, computed, isObservable, autorun } from "mobx";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t, n) => observable.box(t, { name: n }),
  shallow: (t, n) => observable.box(t, { name: n, deep: false }),
  computed: (t, _, n) => computed(t, { name: n }),
  computedCleanup: noop,
  /**
   * @template T
   * @param {import("..").MaybeSignal<import(".").SignalHKT,import(".").ComputedHKT,T>} t
   * @returns {T}
   */
  toValue: (t) =>
    isObservable(t)
      ? /** @type {ReturnType<typeof computed<T>>} */ (t).get()
      : /** @type {T} */ (t),
  setValue: (s, t) => {
    s.set(t);
  },
  effect: (fn) => {
    let teardown = noop;
    const stop = autorun(() => {
      teardown();
      teardown = fn() || noop;
    });
    return () => {
      teardown();
      stop();
    };
  },
};
