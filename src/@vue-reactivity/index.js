import { ref, computed, effect, unref, isRef } from "@vue/reactivity";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: ref,
  computed: (fn) => [computed(fn), () => {}],
  toValue:
    /**
     * @template Z
     * @param {import("..").MaybeSignal<import(".").SignalHKT,Z>} t
     * @returns
     */
    (t) => unref(/** @type {import('@vue/reactivity').MaybeRef<Z>}*/ (t)),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => {
    let cleanup = noop;
    const runner = effect(() => {
      cleanup();
      cleanup = fn() || noop;
    });
    return () => {
      cleanup();
      runner.effect.stop();
    };
  },
};
