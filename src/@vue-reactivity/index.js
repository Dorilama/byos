import { ref, computed, effect, toValue } from "@vue/reactivity";

const noop = () => {};
/**
 * @type {import(".").SFN}
 */
export const signalFunctions = {
  signal: ref,
  computed: (fn) => computed(fn),
  toValue: (t) => toValue(t),
  setValue: (s, t) => {
    s.value = t;
  },
  effect: (fn) => {
    let cleanup = noop;
    const runner = effect(() => {
      cleanup();
      cleanup = fn() || noop;
    });
    return () => {
      cleanup();
      runner.effect.stop();
    };
  },
};
