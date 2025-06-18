import { Signal, signal, computed, effect } from "@webreflection/signal";
import { noop, createSignalFunctions } from "..";

/**
 *
 * @template Z
 * @param {Z | Signal<Z>} t
 * @returns
 */
const isSignal = (t) => t instanceof Signal;

/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal,
  computed: (fn) => computed(fn),
  usePeek: (t) => [isSignal(t) ? () => t.peek() : () => t, noop],
  computedCleanup: (t) => {
    // @ts-ignore
    t.e?.dispose();
  },
  toValue: (t) => (isSignal(t) ? t.value : t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => effect(() => fn()),
});
