import { Signal, signal, computed, effect } from "@preact/signals";

import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").isSignal}
 */
const isSignal = (t) => t instanceof Signal;
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal,
  computed: (fn) => computed(fn),
  usePeek: (t) => [isSignal(t) ? () => t.peek() : () => t, noop],
  toValue: (t) => (isSignal(t) ? t.value : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => effect(fn),
});
