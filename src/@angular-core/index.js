import { signal, computed, effect, isSignal, untracked } from "@angular/core";

import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal: (t) => signal(t),
  computed: (fn) => computed(fn),
  usePeek: (t) => [isSignal(t) ? () => untracked(t) : () => t, noop],
  toValue: (t) => (isSignal(t) ? t() : t),
  setValue: (s, t) => {
    s.set(t);
  },
  effect: (fn) => {
    const e = effect((onCleanup) => {
      onCleanup(fn() || noop);
    });
    return () => {
      e.destroy();
    };
  },
});
