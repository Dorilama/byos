import { Signal, signal, computed, effect } from "@preact/signals-core";

const noop = () => {};
/**
 *
 * @template T
 * @param {T | Signal<T>} t
 * @returns
 */
const isSignal = (t) => t instanceof Signal;
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal,
  computed: (fn) => computed(fn),
  computedCleanup: noop,
  toValue: (t) => (isSignal(t) ? t.value : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect,
};
