import { signal, computed, effect, isSignal } from "@angular/core";

import { noop, createSignalFunctions } from "..";
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = createSignalFunctions({
  signal: (t) => signal(t),
  computed: (fn) => computed(fn),
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
