import { observable, computed, isObservable, autorun } from "mobx";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t, opt) => observable.box(t, { name: opt?.name, deep: opt?.deep }),
  computed: (t, _, opt) => computed(t, { name: opt?.name }),
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
