import { Signal, signal, computed, effect } from "usignal";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal,
  computed: (fn) => computed(fn),
  toValue: (t) => (t instanceof Signal ? t.valueOf() : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => effect(() => fn()),
};
