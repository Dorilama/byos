import { Signal, signal, computed, effect } from "usignal";

import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal: (t) => signal(t),
  computed: (fn) => computed(fn),
  toValue: (t) => (t instanceof Signal ? t.valueOf() : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => effect(fn),
});
