import { signal, computed, effect, isSignal } from "@angular/core";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: (t) => signal(t),
  computed: (fn) => computed(fn),
  computedCleanup: noop,
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
};
