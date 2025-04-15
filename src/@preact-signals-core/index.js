import { Signal, signal, computed, effect } from "@preact/signals-core";

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
  toValue: (t) => (isSignal(t) ? t.value : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect,
};
