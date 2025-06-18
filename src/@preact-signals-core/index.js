import { Signal, signal, computed, effect } from "@preact/signals-core";

import { createSignalFunctions } from "..";
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
export const signalFunctions = createSignalFunctions({
  signal,
  computed: (fn) => computed(fn),
  toValue: (t) => (isSignal(t) ? t.value : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect,
});
