import { ref, computed, watchEffect, toValue } from "vue";

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
    (t) => toValue(/** @type {import('@vue/reactivity').MaybeRef<Z>}*/ (t)),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => {
    return watchEffect(
      (onCleanup) => {
        onCleanup(fn() || noop);
      },
      { flush: "sync" }
    );
  },
};
