import { observable, computed, isObservable, autorun, configure } from "mobx";

configure({ enforceActions: "never" });

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t) => observable.box(t),
  computed: (t) => computed(t),
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
