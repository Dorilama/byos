import { Signal, signal, computed, effect } from "@webreflection/signal";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal,
  computed: (fn) => computed(fn),
  computedCleanup: (t) => {
    // @ts-ignore
    t.e?.dispose();
  },
  toValue: (t) => (t instanceof Signal ? t.value : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => effect(() => fn()),
};
