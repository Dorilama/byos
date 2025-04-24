import { Signal, signal, computed, effect } from "usignal";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t) => signal(t),
  shallow: (t) => signal(t),
  computed: (fn) => computed(fn),
  computedCleanup: noop,
  toValue: (t) => (t instanceof Signal ? t.valueOf() : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => effect(fn),
};
